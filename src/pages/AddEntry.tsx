import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Camera } from 'lucide-react';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import TextArea from '../components/ui/TextArea';
import Rating from '../components/ui/Rating';
import Button from '../components/ui/Button';
import { submitWineEntry, analyzeWineLabel, type WineSubmission } from '../services/api';
import type { WineType } from '../types/wine';

export default function AddEntry() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // We keep some fields as strings for easier input handling, then convert on submit
    const [formData, setFormData] = useState({
        name: '',
        producer: '',
        vintage: new Date().getFullYear().toString(),
        type: 'Red' as WineType,
        region: '',
        country: '',
        rating: 0,
        price: '',
        purchasedAt: '',
        tastingDate: new Date().toISOString().split('T')[0],
        notes: ''
    });

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsAnalyzing(true);
            const reader = new FileReader();

            reader.onloadend = async () => {
                try {
                    const base64String = reader.result as string;
                    // Send to n8n for analysis
                    const result = await analyzeWineLabel(base64String);

                    // Update form with result
                    setFormData(prev => ({
                        ...prev,
                        name: result["와인명"] || prev.name,
                        producer: result["생산자"] || prev.producer,
                        vintage: (result["빈티지"] || prev.vintage).toString(),
                        type: (result["종류"] as WineType) || prev.type,
                        region: result["지역"] || prev.region,
                        country: result["국가"] || prev.country,
                        // Optional fields if provided by analysis:
                        price: result["가격"] ? result["가격"].toString() : prev.price,
                    }));

                    alert('🎉 Label analyzed! Form updated.');
                } catch (error) {
                    console.error('Analysis failed:', error);
                    alert('Failed to analyze wine label. Please try again.');
                } finally {
                    setIsAnalyzing(false);
                    // Reset file input
                    e.target.value = '';
                }
            };

            reader.readAsDataURL(file);

        } catch (error) {
            console.error('Error reading file:', error);
            setIsAnalyzing(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('Save Entry button clicked / Form submitted');

        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            // Prepare data for submission (convert types and translate keys to Korean)
            const submissionData: WineSubmission = {
                "와인명": formData.name,
                "생산자": formData.producer,
                "빈티지": parseInt(formData.vintage) || new Date().getFullYear(),
                "종류": formData.type,
                "지역": formData.region,
                "국가": formData.country,
                "평점": formData.rating,
                "가격": parseFloat(formData.price) || 0,
                "시음일": formData.tastingDate,
                "노트": formData.notes
            };

            console.log('Sending data...', submissionData);

            await submitWineEntry(submissionData);

            console.log('Data sent successfully!');
            alert('🍷 Entry added successfully to your Wine Diary!');

            // Reset form
            setFormData({
                name: '',
                producer: '',
                vintage: new Date().getFullYear().toString(),
                type: 'Red',
                region: '',
                country: '',
                rating: 0,
                price: '',
                purchasedAt: '',
                tastingDate: new Date().toISOString().split('T')[0],
                notes: ''
            });
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to save entry. Please ensure the webhook URL is correct.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-wine-950">와인 등록하기</h1>
                <p className="text-stone-500 mt-2">테이스팅 노트를 기록하고 나만의 셀러를 만들어보세요.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 border border-stone-100 shadow-sm space-y-6">

                {/* Core Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                            사진으로 자동 입력
                        </label>
                        <div className="flex gap-4 items-center flex-wrap">
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                id="camera-upload"
                                onChange={handleImageUpload}
                                disabled={isAnalyzing || isSubmitting}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="gallery-upload"
                                onChange={handleImageUpload}
                                disabled={isAnalyzing || isSubmitting}
                            />

                            {/* Camera Button */}
                            <label
                                htmlFor="camera-upload"
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 
                                    text-stone-700 bg-white hover:bg-stone-50 cursor-pointer transition-colors
                                    ${(isAnalyzing || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                <Camera className="w-5 h-5 text-wine-600" />
                                <span>카메라</span>
                            </label>

                            {/* Gallery Button */}
                            <label
                                htmlFor="gallery-upload"
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 
                                    text-stone-700 bg-white hover:bg-stone-50 cursor-pointer transition-colors
                                    ${(isAnalyzing || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wine-600">
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                    <circle cx="9" cy="9" r="2" />
                                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                </svg>
                                <span>갤러리</span>
                            </label>

                            {isAnalyzing && <span className="text-sm text-stone-500 animate-pulse">분석 중...</span>}
                        </div>
                    </div>

                    <Input
                        label="와인명"
                        name="name"
                        placeholder="예: Château Margaux"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="md:col-span-2"
                        disabled={isSubmitting}
                    />

                    <Input
                        label="생산자"
                        name="producer"
                        placeholder="예: Château Margaux"
                        value={formData.producer}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />

                    <Input
                        label="빈티지"
                        name="vintage"
                        type="number"
                        placeholder="예: 2015"
                        value={formData.vintage}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />

                    <Select
                        label="와인 종류"
                        name="type"
                        options={[
                            { value: 'Red', label: '레드' },
                            { value: 'White', label: '화이트' },
                            { value: 'Rose', label: '로제' },
                            { value: 'Sparkling', label: '스파클링' },
                            { value: 'Dessert', label: '디저트' },
                            { value: 'Fortified', label: '주정강화' },
                        ]}
                        value={formData.type}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />

                    <Input
                        label="지역"
                        name="region"
                        placeholder="예: Bordeaux"
                        value={formData.region}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />

                    <Input
                        label="국가"
                        name="country"
                        placeholder="예: France"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="border-t border-stone-100 my-6"></div>

                {/* Tasting Details */}
                <div className="space-y-6">
                    <Rating
                        label="평점"
                        value={formData.rating}
                        onChange={(val) => setFormData(prev => ({ ...prev, rating: val }))}
                    />

                    <TextArea
                        label="테이스팅 노트"
                        name="notes"
                        placeholder="색상, 향, 맛, 피니시 등을 기록해보세요..."
                        rows={5}
                        value={formData.notes}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            label="시음일"
                            name="tastingDate"
                            type="date"
                            value={formData.tastingDate}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        <Input
                            label="가격"
                            name="price"
                            type="number"
                            placeholder="예: 50000"
                            value={formData.price}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        <Input
                            label="구매처"
                            name="purchasedAt"
                            placeholder="예: 와인나라"
                            value={formData.purchasedAt}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                    <Button type="button" variant="ghost" disabled={isSubmitting}>취소</Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? '저장 중...' : '저장하기'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
