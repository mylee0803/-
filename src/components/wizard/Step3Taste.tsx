import { useState } from 'react';
import Button from '../ui/Button';

interface TasteData {
    body: number;
    tannin: number;
    acidity: number;
    sweetness: number;
    aromas: string[];
}



const AROMA_OPTIONS = [
    { label: '체리', icon: '🍒' },
    { label: '자두', icon: '🫐' },
    { label: '딸기', icon: '🍓' },
    { label: '사과', icon: '🍎' },
    { label: '배', icon: '🍐' },
    { label: '레몬', icon: '🍋' },
    { label: '복숭아', icon: '🍑' },
    { label: '꽃', icon: '🌸' },
    { label: '허브', icon: '🌿' },
    { label: '오크', icon: '🪵' },
    { label: '바닐라', icon: '🍦' },
    { label: '향신료', icon: '🧂' },
    { label: '초콜릿', icon: '🍫' },
    { label: '가죽', icon: '👜' },
    { label: '흙', icon: '🪨' },
];

export default function Step3Taste({ onNext, initialData, updateData }: { onNext: () => void, initialData?: any, updateData: (data: any) => void }) {
    const [data, setData] = useState<TasteData>({
        body: initialData?.body || 3,
        tannin: initialData?.tannin || 3,
        acidity: initialData?.acidity || 3,
        sweetness: initialData?.sweetness || 3,
        aromas: initialData?.aromas || [],
    });

    const handleSliderChange = (key: keyof TasteData, value: number) => {
        const newData = { ...data, [key]: value };
        setData(newData);
        updateData(newData);
    };

    const toggleAroma = (aroma: string) => {
        const newAromas = data.aromas.includes(aroma)
            ? data.aromas.filter(a => a !== aroma)
            : [...data.aromas, aroma];
        const newData = { ...data, aromas: newAromas };
        setData(newData);
        updateData(newData);
    };

    const renderSlider = (label: string, key: keyof TasteData) => (
        <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-stone-700">
                <span>{label}</span>
                <span className="text-wine-600">{data[key as keyof TasteData]}</span>
            </div>
            <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={data[key as keyof TasteData] as number}
                onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
                onPointerDownCapture={(e) => e.stopPropagation()}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-wine-600"
            />
            <div className="flex justify-between text-xs text-stone-400 font-serif">
                <span>Light</span>
                <span>Bold</span>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full px-6 py-6">
            <h2 className="text-xl font-bold text-stone-800 mb-2 font-serif">
                와인의 맛과 향은 어떠셨나요?
            </h2>
            <p className="text-stone-500 text-sm mb-6">
                느껴지는대로 자유롭게 기록해보세요.
            </p>

            <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                {/* Taste Sliders */}
                <div className="space-y-6 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                    {renderSlider('바디감 (Body)', 'body')}
                    {renderSlider('타닌 (Tannin)', 'tannin')}
                    {renderSlider('산도 (Acidity)', 'acidity')}
                    {renderSlider('당도 (Sweetness)', 'sweetness')}
                </div>

                {/* Aroma Grid */}
                <div>
                    <h3 className="text-sm font-bold text-stone-700 mb-3">아로마 (다중 선택 가능)</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {AROMA_OPTIONS.map((aroma) => (
                            <button
                                key={aroma.label}
                                onClick={() => toggleAroma(aroma.label)}
                                className={`
                                    flex flex-col items-center justify-center p-3 rounded-xl border transition-all aspect-square
                                    ${data.aromas.includes(aroma.label)
                                        ? 'border-wine-500 bg-wine-50 text-wine-700 shadow-sm'
                                        : 'border-stone-100 bg-white text-stone-600 hover:bg-stone-50'
                                    }
                                `}
                            >
                                <span className="text-2xl mb-1">{aroma.icon}</span>
                                <span className="text-xs font-medium">{aroma.label}</span>
                            </button>
                        ))}
                    </div>
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
