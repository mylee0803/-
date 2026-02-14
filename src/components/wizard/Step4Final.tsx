import { useState, type ChangeEvent } from 'react';
import Button from '../ui/Button';

interface FinalData {
    date: string;
    price: string;
    note: string;
    rating: number;
}



export default function Step4Final({ onSubmit, initialData, isSubmitting, updateData }: { onSubmit: () => void, initialData?: any, isSubmitting: boolean, updateData: (data: any) => void }) {
    const [formData, setFormData] = useState<FinalData>({
        date: initialData?.date || new Date().toISOString().split('T')[0],
        price: initialData?.price || '',
        note: initialData?.note || '',
        rating: initialData?.rating || 0
    });

    // Rating star logic
    const handleRating = (value: number) => {
        const newData = { ...formData, rating: value };
        setFormData(newData);
        updateData(newData);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newData = { ...formData, [name]: value };
        setFormData(newData);
        updateData(newData);
    };

    return (
        <div className="flex flex-col h-full px-6 py-6">
            <h2 className="text-xl font-bold text-stone-800 mb-2 font-serif">
                마지막으로 정리해볼까요?
            </h2>
            <p className="text-stone-500 text-sm mb-6">
                가격과 평점, 개인적인 기록을 남겨주세요.
            </p>

            <div className="flex-1 overflow-y-auto space-y-6" style={{ touchAction: 'pan-y' }}>

                {/* Rating */}
                <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm flex flex-col items-center">
                    <label className="text-sm font-bold text-stone-700 mb-3">나의 평점</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleRating(star)}
                                className={`text-3xl transition-transform hover:scale-110 focus:outline-none ${formData.rating >= star ? 'text-yellow-400' : 'text-stone-200'
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date & Price */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                            시음 날짜
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-wine-500 focus:border-transparent outline-none transition-all text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                            구매 가격
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="원"
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-wine-500 focus:border-transparent outline-none transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Note */}
                <div className="flex-1 min-h-[150px]">
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                        한줄 총평
                    </label>
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        placeholder="이 와인에 대한 기억을 남겨주세요."
                        className="w-full h-32 px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-wine-500 focus:border-transparent outline-none transition-all resize-none text-base"
                    />
                </div>
            </div>

            <div className="pt-6 mt-auto">
                <Button
                    fullWidth
                    size="lg"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="shadow-lg shadow-wine-100 bg-wine-600 hover:bg-wine-700"
                >
                    {isSubmitting ? '저장 중...' : '와인 등록 완료'}
                </Button>
            </div>
        </div>
    );
}
