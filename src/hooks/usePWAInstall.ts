import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            console.log('[usePWAInstall] beforeinstallprompt captured');
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const install = async () => {
        if (!deferredPrompt) {
            console.warn('[usePWAInstall] install called but deferredPrompt is null');
            return;
        }

        try {
            console.log('[usePWAInstall] Triggering prompt');
            // Show the install prompt
            await deferredPrompt.prompt();

            // Wait for the user to respond to the prompt
            const choiceResult = await deferredPrompt.userChoice;
            console.log('[usePWAInstall] User choice:', choiceResult.outcome);

            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
        } catch (err) {
            console.error('[usePWAInstall] Install prompt error:', err);
        } finally {
            // We've used the prompt, and can't use it again, throw it away
            setDeferredPrompt(null);
            setIsInstallable(false);
        }
    };

    return { isInstallable, install };
}
