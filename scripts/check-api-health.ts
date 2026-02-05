
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM 환경에서 __dirname 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env 파일 로드
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const URLS_TO_CHECK = [
    { key: 'VITE_N8N_LIST_URL', name: 'Wine List API' },
    { key: 'VITE_N8N_WEBHOOK_URL', name: 'Wine Entry API' },
    { key: 'VITE_N8N_ANALYSIS_WEBHOOK_URL', name: 'Label Analysis API' }
];

async function checkUrl(name: string, url: string | undefined) {
    if (!url) {
        console.error(`❌ [${name}] URL이 .env 파일에 정의되지 않았습니다.`);
        return false;
    }

    // ngrok 사용 시 /webhook/ 경로 처리 로직 (서비스 코드와 동일하게 처리)
    let targetUrl = url;
    if (!url.includes('/webhook/')) {
        targetUrl = url.replace(/\/$/, '') + `/webhook/${name === 'Wine List API' ? 'get-wines' : 'wine-entry'}`;
        // 주의: 간단한 체크를 위해 여기서는 대략적으로 처리하지만, 실제 서비스 로직과 완전히 동일하게 맞추는 것이 좋습니다.
        // 다만 현재 .env에는 풀 URL이 들어있으므로 그대로 사용될 것입니다.
    }

    console.log(`Checking [${name}]: ${targetUrl}...`);

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 타임아웃

        const response = await fetch(targetUrl, {
            method: 'OPTIONS', // 가벼운 요청으로 체크 (또는 GET)
            headers: {
                'ngrok-skip-browser-warning': 'true'
            },
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok || response.status === 405 || response.status === 200) {
            // 405 Method Not Allowed도 서버가 살아있다는 증거로 볼 수 있음 (Webhook이 POST만 받을 경우)
            console.log(`✅ [${name}] 연결 성공 (${response.status})`);
            return true;
        } else {
            console.error(`⚠️ [${name}] 서버 응답 오류: ${response.status} ${response.statusText}`);
            return false;
        }
    } catch (error: any) {
        console.error(`❌ [${name}] 연결 실패: ${error.message}`);
        if (error.cause) console.error('   Cause:', error.cause);
        return false;
    }
}

async function main() {
    console.log('🔍 와인 다이어리 API 연결 상태 점검 시작...\n');
    let allSuccess = true;

    for (const { key, name } of URLS_TO_CHECK) {
        const url = process.env[key];
        const success = await checkUrl(name, url);
        if (!success) allSuccess = false;
    }

    console.log('\n------------------------------------------------');
    if (allSuccess) {
        console.log('✨ 모든 API 서버가 정상적으로 응답하고 있습니다.');
        process.exit(0);
    } else {
        console.error('🔥 일부 API 연결에 실패했습니다. .env 설정을 확인하거나 서버 상태를 점검하세요.');
        process.exit(1);
    }
}

main();
