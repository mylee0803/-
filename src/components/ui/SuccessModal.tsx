import { useEffect } from 'react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100 animate-in zoom-in-95 duration-200 text-center">

                {/* Success Icon */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-wine-50 mb-6">
                    <svg className="h-8 w-8 text-wine-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-bold text-wine-950 mb-2">
                    저장 완료!
                </h3>
                <p className="text-stone-500 mb-8">
                    셀러에 소중한 와인이 저장되었습니다.
                </p>

                {/* Action Button */}
                <button
                    type="button"
                    className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-wine-600 hover:bg-wine-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine-500 transition-colors"
                    onClick={onClose}
                >
                    확인
                </button>
            </div>
        </div>
    );
}
