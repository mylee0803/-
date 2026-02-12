// import type { Wine } from '../types/wine';

import type { WineType } from '../types/wine';

export interface WineSubmission {
    nameEn: string;
    nameKr?: string;
    producer?: string;
    vintage?: number;
    type: WineType;
    region?: string;
    country?: string;
    abv?: number | null;
    price?: number;
    rating: number;
    date: string;
    note?: string;
    purchasedAt?: string;
    [key: string]: any; // Allow extra fields if needed
}

// Helper to construct the full webhook URL
// If the env var contains "/webhook/", use it as is (legacy/local support)
// Otherwise, append "/webhook/{path}" (production base domain support)
function getWebhookUrl(baseUrlOrFullUrl: string | undefined, path: string): string {
    if (!baseUrlOrFullUrl) {
        throw new Error(`Environment variable for ${path} is not defined`);
    }

    if (baseUrlOrFullUrl.includes('/webhook/')) {
        return baseUrlOrFullUrl;
    }

    // Ensure no double slashes when joining
    const base = baseUrlOrFullUrl.replace(/\/$/, '');
    return `${base}/webhook/${path}`;
}

// Centralized Headers Configuration
// TODO: When migrating to Raspberry Pi (Local Network), remove 'ngrok-skip-browser-warning'
const getCommonHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420', // Magic number to bypass ngrok warning
    };
};

export async function submitWineEntry(data: WineSubmission): Promise<void> {
    const webhookUrl = getWebhookUrl(import.meta.env.VITE_N8N_WEBHOOK_URL, 'wine-entry');
    console.log('[API] Submitting entry to:', webhookUrl);

    // Using fetch with common headers
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: getCommonHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to submit entry: ${response.status} ${response.statusText}`);
    }
}

export async function fetchWines(): Promise<any[]> {
    const listUrl = getWebhookUrl(import.meta.env.VITE_N8N_LIST_URL, 'get-wines') + `?t=${new Date().getTime()}`;
    console.group('[API] Fetching Wines');
    console.log('Target URL:', listUrl);
    console.log('Headers:', getCommonHeaders());
    console.groupEnd();

    try {
        const response = await fetch(listUrl, {
            headers: getCommonHeaders(),
        });

        const rawText = await response.text();

        // Check for HTML response (ngrok warning or error page)
        if (rawText.trim().startsWith('<!DOCTYPE html>') || rawText.includes('ngrok-skip-browser-warning')) {
            console.error('[API] Server returned HTML instead of JSON. Likely an ngrok warning page or firewall issue.');
            console.error('Raw Response Preview:', rawText.substring(0, 500));
            throw new Error('서버 연결 방화벽 확인 필요 (HTML 응답 감지됨)');
        }

        if (!response.ok) {
            throw new Error(`서버 응답 오류 (${response.status}): ${response.statusText}`);
        }

        try {
            return JSON.parse(rawText);
        } catch (jsonError) {
            console.error('[API] JSON Parse Error. Raw Text:', rawText);
            throw new Error('서버 응답 데이터 형식이 올바르지 않습니다.');
        }

    } catch (error: any) {
        console.error('[API] fetchWines Error:', error);

        if (error.message === 'Failed to fetch') {
            throw new Error('서버에 연결할 수 없습니다. 인터넷 설정이나 API URL 설정을 확인해주세요.');
        }

        throw error;
    }
}

export async function analyzeWineLabel(base64Image: string): Promise<Partial<WineSubmission>> {
    const analysisUrl = getWebhookUrl(import.meta.env.VITE_N8N_ANALYSIS_WEBHOOK_URL, 'analyze-label');
    console.log('[API] Analyzing label with URL:', analysisUrl);

    // Use modern fetch API to convert Base64 to Blob (Correctly handles MIME types and binary data)
    const imageBlob = await (await fetch(base64Image)).blob();

    // Data Preparation Logging
    console.log(`[API] Image Blob Size: ${imageBlob.size} bytes`);
    console.log(`[API] Image Blob Type: ${imageBlob.type}`);

    // Prepare FormData
    const formData = new FormData();
    formData.append('data', imageBlob, 'image.jpg');

    const MAX_RETRIES = 1;
    let lastError: any;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            if (attempt > 0) {
                console.log(`[API] Retrying analysis (Attempt ${attempt + 1}/${MAX_RETRIES + 1})...`);
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s Timeout

            const response = await fetch(analysisUrl, {
                method: 'POST',
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
                body: formData,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            // Always log the raw response text first for debugging
            const rawText = await response.text();
            console.log('[API] Raw Response from N8N:', rawText);

            if (!rawText.trim()) {
                console.error('[API] Received empty response from N8N');
                throw new Error('서버로부터 빈 응답이 왔습니다. (N8N 워크플로우를 확인해주세요)');
            }

            if (!response.ok) {
                const errorMessage = `Failed to analyze label (${response.status}): ${response.statusText}\nRaw Response: ${rawText}`;
                console.error(`[API] ${errorMessage}`);
                throw new Error(errorMessage);
            }

            try {
                return JSON.parse(rawText);
            } catch (jsonError) {
                console.error('[API] Failed to parse JSON response:', jsonError);
                throw new Error(`Invalid JSON response: ${rawText.substring(0, 100)}...`);
            }

        } catch (error: any) {
            console.error(`[API] Analysis Attempt ${attempt + 1} Failed:`, error);
            lastError = error;

            // Should not retry if it's a 4xx error (client error) unless it's 408 (Request Timeout) or 429 (Too Many Requests)
            // But for simplicity/safety against N8N flakiness, we retry network errors or 5xx.
            // If AbortError (Time out), definitely retry.
            // If "Empty response", do NOT retry (it's likely a logic error in N8N)
            const isTimeout = error.name === 'AbortError' || error.message.includes('aborted');
            const isEmptyResponse = error.message.includes('빈 응답');

            if (attempt < MAX_RETRIES && !isEmptyResponse && (isTimeout || !error.message.includes('4'))) {
                // Wait a bit before retry (e.g., 1s)
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
        }
    }

    throw lastError || new Error('Analysis failed after retries');
}
