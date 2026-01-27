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
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-stone-100 cursor-pointer h-full flex flex-col"
        >
            {/* Image Section */}
            <div className="relative h-48 sm:h-56 bg-stone-100 overflow-hidden">
                {wine.imageUrl ? (
                    <img
                        src={wine.imageUrl}
                        alt={wine.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-50 text-stone-300">
                        {/* Fallback pattern or icon could go here */}
                        <svg className="w-12 h-12 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 1c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2H7zm0 2h10v14H7V3zm2 2v2h2V5H9zm0 4v2h2V9H9zm0 4v2h2v-2H9z" />
                        </svg>
                    </div>
                )}
                <div className="absolute top-3 left-3">
                    <Badge type={wine.type}>{wine.type}</Badge>
                </div>
                {wine.rating > 0 && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="text-xs font-bold text-stone-800">{wine.rating}</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-auto">
                    <div className="text-xs font-semibold text-stone-400 mb-1 uppercase tracking-wide">
                        {wine.country} · {wine.region}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-stone-900 leading-tight mb-2 group-hover:text-wine-800 transition-colors line-clamp-2">
                        {wine.name}
                    </h3>
                    <p className="text-sm text-stone-500 font-medium mb-3">{wine.producer} <span className="text-stone-300 mx-1">|</span> {wine.vintage}</p>

                    {wine.notes && (
                        <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed mb-4 opacity-80">
                            {wine.notes}
                        </p>
                    )}
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-4">
                    <span className="text-xs text-stone-400 font-medium">
                        {new Date(wine.tastingDate).toLocaleDateString()}
                    </span>
                    {wine.price && (
                        <span className="text-sm font-bold text-wine-900">
                            ${wine.price.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
