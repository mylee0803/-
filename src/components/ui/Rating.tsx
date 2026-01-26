import { useState } from 'react';

interface RatingProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    max?: number;
    error?: string;
}

export default function Rating({ label, value, onChange, max = 5, error }: RatingProps) {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                {label}
            </label>
            <div className="flex items-center gap-1">
                {[...Array(max)].map((_, index) => {
                    const starValue = index + 1;
                    const isFilled = (hoverValue !== null ? hoverValue : value) >= starValue;

                    return (
                        <button
                            key={starValue}
                            type="button"
                            onClick={() => onChange(starValue)}
                            onMouseEnter={() => setHoverValue(starValue)}
                            onMouseLeave={() => setHoverValue(null)}
                            className="focus:outline-none transition-transform active:scale-90"
                        >
                            <svg
                                className={`w-8 h-8 transition-colors duration-200 ${isFilled ? 'text-gold-500 fill-current' : 'text-stone-300 fill-current hover:text-gold-200'
                                    }`}
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        </button>
                    );
                })}
                <span className="ml-2 text-sm text-stone-500 font-medium">
                    {hoverValue !== null ? hoverValue : value} / {max}
                </span>
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
