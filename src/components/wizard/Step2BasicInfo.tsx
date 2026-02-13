import { useState, useEffect, type ChangeEvent } from 'react';
import Button from '../ui/Button';


interface BasicInfoData {
    nameKr: string;
    nameEn: string;
    vintage: string;
    country: string;
}

interface Step2BasicInfoProps {
    onNext: (data: BasicInfoData) => void;
    initialData?: Partial<BasicInfoData>;
}

export default function Step2BasicInfo({ onNext, initialData }: Step2BasicInfoProps) {
    const [formData, setFormData] = useState<BasicInfoData>({
        nameKr: initialData?.nameKr || '',
        nameEn: initialData?.nameEn || '',
        vintage: initialData?.vintage || '',
        country: initialData?.country || ''
    });

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        // Validation: At least one name and valid vintage required
        const hasName = formData.nameKr.trim().length > 0 || formData.nameEn.trim().length > 0;
        const hasVintage = formData.vintage.trim().length === 4; // Simple 4-digit check

        setIsValid(hasName && hasVintage);
    }, [formData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (isValid) {
            onNext(formData);
        }
    };

    return (
        <div className="flex flex-col h-full px-6 py-6">
            <h2 className="text-xl font-bold text-stone-800 mb-2 font-serif">
                기본 정보를 입력해주세요
            </h2>
            <p className="text-stone-500 text-sm mb-8">
                와인의 이름과 빈티지를 확인해주세요.
            </p>

            <div className="space-y-6 flex-1 overflow-y-auto">
                {/* Korean Name */}
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                        와인명 (한글) <span className="text-wine-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="nameKr"
                        value={formData.nameKr}
                        onChange={handleChange}
                        placeholder="와인 이름을 한글로 입력하세요"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-wine-500 focus:border-transparent outline-none transition-all font-bold text-lg placeholder:font-normal placeholder:text-stone-400"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                    />
                </div>

                {/* English Name */}
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                        와인명 (영문)
                    </label>
                    <input
                        type="text"
                        name="nameEn"
                        value={formData.nameEn}
                        onChange={handleChange}
                        placeholder="e.g. Château Margaux"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-wine-500 focus:border-transparent outline-none transition-all font-serif text-lg placeholder:font-sans placeholder:text-stone-400"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Vintage */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                            빈티지 <span className="text-wine-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="vintage"
                            value={formData.vintage}
                            onChange={handleChange}
                            placeholder="YYYY"
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-wine-500 focus:border-transparent outline-none transition-all text-center text-lg"
                            inputMode="numeric"
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                            국가
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="예: 프랑스"
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-wine-500 focus:border-transparent outline-none transition-all text-center text-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6 mt-auto">
                <Button
                    fullWidth
                    size="lg"
                    onClick={handleNext}
                    disabled={!isValid}
                    className="shadow-lg shadow-wine-100"
                >
                    다음 단계로
                </Button>
            </div>
        </div>
    );
}
