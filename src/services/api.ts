import type { WineType } from '../types/wine';
import { getApiUrl } from '../config';

export interface WineSubmission {
    nameEn: string;
    nameKr?: string;
    producer?: string;
    vintage?: number;
    type: WineType;
    region?: string;
    country?: string;
    variety?: string;
    abv?: number | null;
    price?: number;
    rating: number;
    date: string;
    note?: string;
    body?: number;
    purchasedAt?: string;
    tannin?: number;
    acidity?: number;
    sweetness?: number;
    aromas?: string[];
    image?: string;
}

const getCommonHeaders = () => ({
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
});

async function fetchData(absoluteUrl: string) {
    console.log('[API CALL] Requesting to:', absoluteUrl);
    try {
        const response = await fetch(absoluteUrl, { headers: getCommonHeaders() });
        if (!response.ok) throw new Error('Network response error: ' + response.status);
        return response.json();
    } catch (error: any) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            console.error(
                `[API CRITICAL] Network Error Detected!\n` +
                `1. Check if n8n/ngrok is running.\n` +
                `2. Verify n8n CORS settings (Allowed Origins).\n` +
                `3. Check if 'browser-skip-warning' header is active.`
            );
        }
        throw error;
    }
}

export async function fetchWines(): Promise<any[]> {
    const targetUrl = getApiUrl('GET_WINES');
    // Cache busting
    return fetchData(`${targetUrl}?t=${Date.now()}`);
}

export async function submitWineEntry(data: WineSubmission): Promise<void> {
    const targetUrl = getApiUrl('WINE_ENTRY');
    await fetch(targetUrl, {
        method: 'POST',
        headers: getCommonHeaders(),
        body: JSON.stringify(data),
    });
}

export async function analyzeWineLabel(base64Image: string): Promise<any> {
    const targetUrl = getApiUrl('ANALYZE_LABEL');

    console.log('[API CALL] Requesting to:', targetUrl);

    // Modern fetch API to convert Base64 to Blob
    const blob = await (await fetch(base64Image)).blob();
    const formData = new FormData();
    formData.append('data', blob, 'image.jpg');

    const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
            'ngrok-skip-browser-warning': 'true',
        },
        body: formData,
    });

    if (!response.ok) throw new Error('Analysis failed: ' + response.status);
    return response.json();
}
