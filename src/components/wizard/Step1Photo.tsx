import { useState, useRef, type ChangeEvent } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { resizeImage } from '../../utils/imageUtils';
import Button from '../ui/Button';

interface Step1PhotoProps {
    onNext: (photoData: string) => void;
    initialPhoto?: string;
}

export default function Step1Photo({ onNext, initialPhoto }: Step1PhotoProps) {
    const [photo, setPhoto] = useState<string | null>(initialPhoto || null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Refs for hidden file inputs
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsProcessing(true);
            const resizedImage = await resizeImage(file);
            setPhoto(resizedImage);
        } catch (error) {
            console.error('Image processing failed:', error);
            alert('사진을 처리하는 중 오류가 발생했습니다.');
        } finally {
            setIsProcessing(false);
            // Reset input value to allow selecting same file again
            e.target.value = '';
        }
    };

    const handleCameraClick = () => {
        cameraInputRef.current?.click();
    };

    const handleGalleryClick = () => {
        galleryInputRef.current?.click();
    };

    const handleNext = () => {
        onNext(photo || '');
    };

    return (
        <div className="flex flex-col h-full px-6 py-6">
            <h2 className="text-xl font-bold text-stone-800 mb-2 font-serif">
                와인 라벨을 촬영해주세요
            </h2>
            <p className="text-stone-500 text-sm mb-6">
                라벨을 인식하여 자동으로 정보를 입력해드립니다.
            </p>

            {/* Photo Card Area */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-0">
                <div
                    className="relative w-full aspect-[3/4] bg-stone-100 rounded-2xl border-2 border-dashed border-stone-300 overflow-hidden flex flex-col items-center justify-center cursor-pointer group hover:border-wine-300 transition-colors shadow-sm"
                    onClick={() => !photo && handleCameraClick()} // Click card to open camera if empty
                >
                    {photo ? (
                        <>
                            <img
                                src={photo}
                                alt="Wine Label"
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay actions when photo exists */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleCameraClick(); }}
                                    className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                                >
                                    <Camera className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleGalleryClick(); }}
                                    className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                                >
                                    <ImageIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="w-16 h-16 bg-wine-50 rounded-full flex items-center justify-center text-wine-500 mb-4 group-hover:scale-110 transition-transform">
                                <Camera className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-stone-700 mb-1">
                                라벨 사진을 업로드하세요
                            </h3>
                            <p className="text-xs text-stone-400 font-serif">
                                밝은 곳에서 라벨 전체가 나오도록<br />촬영해주세요
                            </p>
                        </div>
                    )}
                </div>

                {/* Mobile Camera/Gallery Buttons (Visible below card) */}
                {!photo && (
                    <div className="flex gap-3 mt-6 w-full">
                        <button
                            onClick={handleCameraClick}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-wine-600 text-white rounded-xl shadow-md active:scale-95 transition-all"
                        >
                            <Camera className="w-5 h-5" />
                            <span className="font-medium">카메라</span>
                        </button>
                        <button
                            onClick={handleGalleryClick}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-stone-200 text-stone-700 rounded-xl shadow-sm active:scale-95 transition-all hover:bg-stone-50"
                        >
                            <ImageIcon className="w-5 h-5" />
                            <span className="font-medium">갤러리</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Hidden Inputs */}
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={cameraInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            <input
                type="file"
                accept="image/*"
                ref={galleryInputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Bottom Action */}
            <div className="mt-auto pt-6">
                <Button
                    fullWidth
                    size="lg"
                    onClick={handleNext}
                    className="shadow-lg shadow-wine-100"
                >
                    {isProcessing ? '처리 중...' : '다음 단계로'}
                </Button>
            </div>
        </div>
    );
}
