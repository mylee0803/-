import { useState, type ChangeEvent } from 'react';
import Button from '../ui/Button';


interface BasicInfoData {
    nameKr: string;
    nameEn: string;
    vintage: string;
    country: string;
    variety: string;
}

export default function Step2BasicInfo({ onNext, initialData, updateData }: { onNext: () => void, initialData?: any, updateData: (data: any) => void }) {
    const [formData, setFormData] = useState<BasicInfoData>({
        nameKr: initialData?.nameKr || '',
        nameEn: initialData?.nameEn || '',
        vintage: initialData?.vintage || '',
        country: initialData?.country || '',
        variety: initialData?.variety || ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newData = { ...formData, [name]: value };
        setFormData(newData);
        updateData(newData);
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
                    <label className="block text-sm font-bold text-stone-700 mb-2" style={{ fontFamily: 'Pretendard, sans-serif' }}>
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
                    <label className="block text-sm font-bold text-stone-700 mb-2" style={{ fontFamily: 'Pretendard, sans-serif' }}>
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

                {/* Vintage */}
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                        빈티지 <span className="text-wine-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="vintage"
                        value={formData.vintage}
                        onChange={handleChange}
                        placeholder="YYYY"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-wine-500 focus:border-transparent outline-none transition-all text-center text-lg font-serif"
                        inputMode="numeric"
                    />
                </div>

                {/* Country */}
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                        국가
                    </label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="예: 프랑스"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-wine-500 focus:border-transparent outline-none transition-all text-center text-lg font-serif"
                    />
                </div>

                {/* Variety */}
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-stone-700 mb-2" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                        품종 (Variety)
                    </label>
                    <input
                        type="text"
                        name="variety"
                        value={formData.variety}
                        onChange={handleChange}
                        placeholder="예: Cabernet Sauvignon"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-wine-500 focus:border-transparent outline-none transition-all text-lg font-serif placeholder:font-sans placeholder:text-stone-300"
                    />
                </div>
            </div>

            <div className="pt-6 mt-auto">
                <Button
                    fullWidth
                    size="lg"
                    onClick={onNext}

                    className="shadow-lg shadow-wine-100"
                >
                    다음 단계로
                </Button>
            </div>
        </div>
    );
}
