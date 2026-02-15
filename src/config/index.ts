export const API_CONFIG = {
    FALLBACK_URL: 'https://unscarved-dictatorially-dulce.ngrok-free.dev',
    ENDPOINTS: {
        GET_WINES: '/webhook/get-wines',
        WINE_ENTRY: '/webhook/wine-entry',
        ANALYZE_LABEL: '/webhook/analyze-label',
    },
    ENV: {
        LIST_URL: import.meta.env.VITE_N8N_LIST_URL,
        WEBHOOK_URL: import.meta.env.VITE_N8N_WEBHOOK_URL,
        ANALYSIS_URL: import.meta.env.VITE_N8N_ANALYSIS_WEBHOOK_URL,
    }
};

/**
 * Returns the absolute API URL for a given endpoint key.
 * Prioritizes Environment Variable > Fallback URL + Endpoint Path.
 */
export const getApiUrl = (key: keyof typeof API_CONFIG.ENDPOINTS): string => {
    let envUrl = '';

    switch (key) {
        case 'GET_WINES':
            envUrl = API_CONFIG.ENV.LIST_URL;
            break;
        case 'WINE_ENTRY':
            envUrl = API_CONFIG.ENV.WEBHOOK_URL;
            break;
        case 'ANALYZE_LABEL':
            envUrl = API_CONFIG.ENV.ANALYSIS_URL;
            break;
    }

    if (envUrl && envUrl.startsWith('http')) {
        return envUrl;
    }

    // Fallback Logic
    return `${API_CONFIG.FALLBACK_URL}${API_CONFIG.ENDPOINTS[key]}`;
};
