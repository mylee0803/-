
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const WEBHOOK_URL = process.env.VITE_N8N_ANALYSIS_WEBHOOK_URL;
// A small 1x1 white pixel JPEG base64
const MOCK_BASE64_IMAGE = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";

async function runTest() {
    console.log(`[Debug] Target URL: ${WEBHOOK_URL}`);
    console.log('[Debug] Testing Base64 -> Blob -> Fetch logic...');

    try {
        // --- Logic from api.ts ---
        const base64Image = MOCK_BASE64_IMAGE;

        // Manual Base64 to Blob conversion for strict MIME type control
        const split = base64Image.split(',');
        const byteString = atob(split[1]);
        // Note: In Node.js environment, 'atob' is available in global scope in newer versions (like v18+).
        // Since we ruled 'check-api' running with tsx, this should work.

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        const imageBlob = new Blob([ab], { type: 'image/jpeg' });

        console.log(`[Debug] Created Blob: size=${imageBlob.size}, type=${imageBlob.type}`);

        // Prepare FormData
        const formData = new FormData();
        formData.append('data', imageBlob, 'image.jpg');

        const response = await fetch(WEBHOOK_URL!, {
            method: 'POST',
            headers: {
                'ngrok-skip-browser-warning': 'true',
            },
            body: formData,
        });

        const rawText = await response.text();
        console.log('[Debug] Raw Response:', rawText);
        console.log(`[Debug] Status: ${response.status}`);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        try {
            JSON.parse(rawText);
            console.log('✅ Base64 conversion logic works! N8N returned valid JSON.');
        } catch (e) {
            console.error('❌ N8N returned invalid JSON (Empty or Text). Logic might be sending broken file?');
        }

    } catch (error) {
        console.error('❌ Script failed:', error);
    }
}

runTest();
