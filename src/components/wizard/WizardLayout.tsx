import { type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WizardLayoutProps {
    children: ReactNode;
    currentStep: number;
    totalSteps?: number;
    onBack?: () => void;
    onClose?: () => void;
    title?: string;
    previewImage?: string;
    onStepClick?: (step: number) => void;
}

export default function WizardLayout({
    children,
    currentStep,
    totalSteps = 4,
    onBack,
    onClose,
    title,
    previewImage,
    onStepClick
}: WizardLayoutProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col h-screen bg-stone-50">
            {/* Header */}
            <header className="flex items-center justify-between px-4 h-14 bg-white border-b border-stone-100 shrink-0 z-10 relative">
                <button
                    onClick={handleBack}
                    className="p-2 -ml-2 text-stone-600 hover:text-stone-900 transition-colors"
                    aria-label="뒤로 가기"
                >
                    <X className="w-6 h-6" />
                </button>

                {title ? (
                    <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-stone-800">
                        {title}
                    </h1>
                ) : previewImage ? (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="h-10 w-10 object-cover rounded-full border border-stone-200"
                        />
                    </div>
                ) : null}

                <button
                    onClick={handleClose}
                    className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors"
                >
                    닫기
                </button>
            </header>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-stone-100 shrink-0 flex">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                    <div
                        key={step}
                        className={`h-full flex-1 transition-colors duration-300 ${step <= currentStep ? 'bg-wine-500' : 'bg-stone-200'
                            } cursor-pointer`}
                        onClick={() => {
                            if (onStepClick) onStepClick(step);
                        }}
                    />
                ))}
            </div>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-md mx-auto relative flex flex-col min-h-0 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
