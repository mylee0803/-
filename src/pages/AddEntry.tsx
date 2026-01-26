import { useState, type FormEvent, type ChangeEvent } from 'react';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import TextArea from '../components/ui/TextArea';
import Rating from '../components/ui/Rating';
import Button from '../components/ui/Button';
import { submitWineEntry, type WineSubmission } from '../services/api';
import type { WineType } from '../types/wine';

export default function AddEntry() {
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                <h1 className="text-3xl font-serif font-bold text-wine-950">Add New Wine</h1>
                <p className="text-stone-500 mt-2">Record your tasting notes and build your cellar.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 border border-stone-100 shadow-sm space-y-6">

                {/* Core Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Wine Name"
                        name="name"
                        placeholder="e.g. Château Margaux"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="md:col-span-2"
                        disabled={isSubmitting}
                    />

                    <Input
                        label="Producer"
                        name="producer"
                        placeholder="e.g. Château Margaux"
                        value={formData.producer}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />

                    <Input
                        label="Vintage"
                        name="vintage"
                        type="number"
                        placeholder="e.g. 2015"
                        value={formData.vintage}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />

                    <Select
                        label="Type"
                        name="type"
                        options={[
                            { value: 'Red', label: 'Red' },
                            { value: 'White', label: 'White' },
                            { value: 'Rose', label: 'Rosé' },
                            { value: 'Sparkling', label: 'Sparkling' },
                            { value: 'Dessert', label: 'Dessert' },
                            { value: 'Fortified', label: 'Fortified' },
                        ]}
                        value={formData.type}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />

                    <Input
                        label="Region"
                        name="region"
                        placeholder="e.g. Bordeaux"
                        value={formData.region}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />

                    <Input
                        label="Country"
                        name="country"
                        placeholder="e.g. France"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="border-t border-stone-100 my-6"></div>

                {/* Tasting Details */}
                <div className="space-y-6">
                    <Rating
                        label="Rating"
                        value={formData.rating}
                        onChange={(val) => setFormData(prev => ({ ...prev, rating: val }))}
                    />

                    <TextArea
                        label="Tasting Notes"
                        name="notes"
                        placeholder="Describe the appearance, nose, palate, and finish..."
                        rows={5}
                        value={formData.notes}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            label="Tasting Date"
                            name="tastingDate"
                            type="date"
                            value={formData.tastingDate}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        <Input
                            label="Price"
                            name="price"
                            type="number"
                            placeholder="e.g. 50"
                            value={formData.price}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        <Input
                            label="Purchased At"
                            name="purchasedAt"
                            placeholder="e.g. Local Shop"
                            value={formData.purchasedAt}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                    <Button type="button" variant="ghost" disabled={isSubmitting}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Entry'}
                    </Button>
                </div>

            </form>
        </div>
    )
}
