import type { Wine } from '../types/wine';
import Badge from './Badge';

interface WineCardProps {
    wine: Wine;
    onClick?: (wine: Wine) => void;
}

export default function WineCard({ wine, onClick }: WineCardProps) {
    return (
        <div
            onClick={() => onClick && onClick(wine)}
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-stone-100 cursor-pointer h-full flex flex-col"
        >
            <div className="flex justify-between items-start mb-4">
                <Badge type={wine.type}>{wine.type}</Badge>
                <span className="text-stone-400 text-xs font-medium">{wine.vintage}</span>
            </div>

            <div className="flex-grow">
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-1 group-hover:text-wine-700 transition-colors line-clamp-1">
                    {wine.name}
                </h3>
                <p className="text-stone-500 text-sm mb-3 line-clamp-1">{wine.producer}</p>

                <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            className={`w-4 h-4 ${star <= wine.rating ? 'text-gold-500 fill-current' : 'text-stone-200 fill-current'}`}
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    ))}
                </div>

                {wine.notes && (
                    <p className="text-stone-600 line-clamp-3 text-sm leading-relaxed mb-4">
                        {wine.notes}
                    </p>
                )}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
                <span className="text-xs text-stone-500 font-medium truncate max-w-[60%]">
                    {wine.region}, {wine.country}
                </span>
                {wine.price && (
                    <span className="text-xs font-semibold text-wine-900 bg-wine-50 px-2 py-1 rounded">
                        ${wine.price}
                    </span>
                )}
            </div>
        </div>
    );
}
