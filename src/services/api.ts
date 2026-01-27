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
        throw new Error(`Failed to submit entry: ${response.statusText}`);
    }
}

export async function fetchWines(): Promise<any[]> {
    const listUrl = getWebhookUrl(import.meta.env.VITE_N8N_LIST_URL, 'get-wines');
    console.log('[API] Fetching wines from:', listUrl);

    const response = await fetch(listUrl, {
        headers: {
            'ngrok-skip-browser-warning': 'true', // Bypass ngrok warning page
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch wines: ${response.statusText}`);
    }

    return response.json();
}

export async function analyzeWineLabel(base64Image: string): Promise<Partial<WineSubmission>> {
    const analysisUrl = getWebhookUrl(import.meta.env.VITE_N8N_ANALYSIS_WEBHOOK_URL, 'analyze-label');
    console.log('[API] Analyzing label with URL:', analysisUrl);

    // Remove data:image/jpeg;base64, prefix if present
    const base64Data = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");

    const response = await fetch(analysisUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true', // Bypass ngrok warning page
        },
        body: JSON.stringify({ image: base64Data }),
    });

    if (!response.ok) {
        throw new Error(`Failed to analyze label: ${response.statusText}`);
    }

    return response.json();
}
