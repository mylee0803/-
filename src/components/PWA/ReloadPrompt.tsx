import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCcw, X } from 'lucide-react';
import Button from '../ui/Button';

export default function ReloadPrompt() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl: string, r: ServiceWorkerRegistration | undefined) {
            console.log(`Service Worker at: ${swUrl}`);
            // Check for updates every hour
            if (r) {
                setInterval(() => {
                    r.update();
                }, 60 * 60 * 1000);
            }
        },
        onRegisterError(error: any) {
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setNeedRefresh(false);
    };

    if (!needRefresh) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-xl shadow-2xl border border-stone-200 p-4 z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-wine-100 p-2 rounded-full text-wine-600">
                    <RefreshCcw className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-stone-800 text-sm">새로운 버전 업데이트</h3>
                    <p className="text-stone-500 text-xs mt-1">
                        최신 기능과 수정 사항이 적용된 새 버전이 있습니다. 지금 업데이트하시겠습니까?
                    </p>
                    <div className="mt-3 flex gap-2">
                        <Button
                            size="sm"
                            onClick={() => updateServiceWorker(true)}
                            className="flex-1 text-xs py-2"
                        >
                            업데이트
                        </Button>
                        <button
                            onClick={close}
                            className="px-3 py-2 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors"
                        >
                            닫기
                        </button>
                    </div>
                </div>
                <button onClick={close} className="text-stone-400 hover:text-stone-600">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
