// import type { Wine } from '../types/wine';

// Accepting Record<string, any> to allow localized keys (e.g., "와인명")
export interface WineSubmission extends Record<string, any> { }

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

export async function submitWineEntry(data: WineSubmission): Promise<void> {
    const webhookUrl = getWebhookUrl(import.meta.env.VITE_N8N_WEBHOOK_URL, 'wine-entry');
    console.log('[API] Submitting entry to:', webhookUrl);

    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true', // Bypass ngrok warning page
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to submit entry: ${response.status} ${response.statusText}`);
    }
}

export async function fetchWines(): Promise<any[]> {
    const listUrl = getWebhookUrl(import.meta.env.VITE_N8N_LIST_URL, 'get-wines');
    console.log('[API] Fetching wines from:', listUrl);

    try {
        const response = await fetch(listUrl, {
            headers: {
                'ngrok-skip-browser-warning': 'true', // Bypass ngrok warning page
            },
        });

        if (!response.ok) {
            throw new Error(`서버 응답 오류 (${response.status}): ${response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('[API] fetchWines Error:', error);

        // 네트워크 오류 (Failed to fetch) 메시지 개선
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
