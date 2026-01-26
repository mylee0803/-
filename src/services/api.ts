// import type { Wine } from '../types/wine';

// Accepting Record<string, any> to allow localized keys (e.g., "와인명")
export interface WineSubmission extends Record<string, any> { }

export async function submitWineEntry(data: WineSubmission): Promise<void> {
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

    if (!webhookUrl) {
        throw new Error('VITE_N8N_WEBHOOK_URL is not defined in .env');
    }

    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to submit entry: ${response.statusText}`);
    }
}

export async function fetchWines(): Promise<any[]> {
    const listUrl = import.meta.env.VITE_N8N_LIST_URL;

    if (!listUrl) {
        throw new Error('VITE_N8N_LIST_URL is not defined in .env');
    }

    const response = await fetch(listUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch wines: ${response.statusText}`);
    }

    return response.json();
}
