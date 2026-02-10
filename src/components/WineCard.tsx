import { MapPin, Star, Droplets } from 'lucide-react';
import type { Wine, WineType } from '../types/wine';

interface WineCardProps {
    wine: Wine;
    onClick?: (wine: Wine) => void;
}

export default function WineCard({ wine, onClick }: WineCardProps) {
    // Helper for type-based specific styles
    const getTypeStyles = (type: WineType) => {
        switch (type) {
            case 'Red': return 'bg-rose-50 border-rose-100 hover:border-rose-200';
            case 'White': return 'bg-yellow-50/80 border-yellow-100 hover:border-yellow-200';
            case 'Rose': return 'bg-pink-50 border-pink-100 hover:border-pink-200';
            case 'Sparkling': return 'bg-sky-50 border-sky-100 hover:border-sky-200';
            case 'Dessert': return 'bg-amber-50 border-amber-100 hover:border-amber-200';
            case 'Fortified': return 'bg-purple-50 border-purple-100 hover:border-purple-200';
            default: return 'bg-stone-50 border-stone-200';
        }
    };

    const getTypeLabelColor = (type: WineType) => {
        switch (type) {
            case 'Red': return 'text-rose-700 bg-rose-100/50';
            case 'White': return 'text-yellow-700 bg-yellow-100/50';
            case 'Rose': return 'text-pink-700 bg-pink-100/50';
            case 'Sparkling': return 'text-sky-700 bg-sky-100/50';
            case 'Dessert': return 'text-amber-700 bg-amber-100/50';
            case 'Fortified': return 'text-purple-700 bg-purple-100/50';
            default: return 'text-stone-600 bg-stone-100';
        }
    }

    const cardStyles = getTypeStyles(wine.type);
    const labelStyles = getTypeLabelColor(wine.type);

    return (
        <div
            onClick={() => onClick && onClick(wine)}
            className="group relative bg-white rounded-[4px] shadow-[0_2px_4px_0_rgba(0,0,0,0.04)] border-none py-4 px-3 mb-1 flex flex-row gap-3 cursor-pointer hover:-translate-y-0.5 transition-transform duration-200"
        >
            {/* Image Section (Left, Compact) */}
            <div className="relative w-[60px] h-[60px] flex-shrink-0 bg-stone-100 overflow-hidden rounded-[4px]">
                {wine.imageUrl ? (
                    <img
                        src={wine.imageUrl}
                        alt={wine.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center ${cardStyles}`}>
                        <Droplets className="w-5 h-5 opacity-20" />
                    </div>
                )}

                {/* Type Badge (Top Left, Small) */}
                <div className={`absolute top-1 left-1 px-1 py-0.5 rounded-full text-[8px] font-bold backdrop-blur-md shadow-sm ${labelStyles}`}>
                    {wine.type === 'Red' ? 'RED' :
                        wine.type === 'White' ? 'WHT' :
                            wine.type === 'Rose' ? 'ROS' :
                                wine.type === 'Sparkling' ? 'SPK' :
                                    wine.type === 'Dessert' ? 'DST' : 'PRT'}
                </div>
            </div>

            {/* Content Section (Right) */}
            <div className="flex-grow flex flex-col justify-between relative overflow-hidden py-0.5">
                {/* Rating (Absolute Top Right) - Always Visible */}
                <div className="absolute top-0 right-0 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-stone-600">{Number(wine.rating || 0).toFixed(1)}</span>
                </div>

                <div>
                    {/* Primary Title (Korean preferred, fallback to English) */}
                    <h3 className="text-base font-serif font-bold text-stone-900 leading-tight mb-0.5 group-hover:text-wine-800 transition-colors line-clamp-1 pr-8">
                        {wine.name_kr || wine.name || 'Name'}
                    </h3>

                    {/* Secondary Title (English Name) - Only show if Korean name exists to avoid duplication */}
                    <p className="text-[10px] text-stone-400 font-medium line-clamp-1 mb-1 pr-4 min-h-[15px]">
                        {wine.name_kr ? wine.name : ''}
                    </p>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-2 text-[10px] text-stone-500">
                        <span className="font-semibold text-wine-900/80">
                            {wine.vintage > 0 ? wine.vintage : 'NV'}
                        </span>
                        <span className="w-px h-2 bg-stone-300"></span>
                        <span className="truncate max-w-[80px]">
                            {wine.country || '-'}
                        </span>
                        <span className="w-px h-2 bg-stone-300"></span>
                        <span className="text-stone-400">
                            {wine.abv ? `${wine.abv}%` : '-'}
                        </span>
                    </div>
                </div>

                {/* Footer Icon Row - Adjusted for compact */}
                <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-stone-100">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-stone-400">
                            <MapPin className="w-2.5 h-2.5" />
                            <span className="text-[10px] truncate max-w-[60px]">
                                {wine.region || '-'}
                            </span>
                        </div>
                    </div>

                    <span className="text-[10px] font-bold text-stone-900">
                        {wine.price ? `₩${(wine.price / 10000).toLocaleString()}만원` : '-'}
                    </span>
                </div>
            </div>
        </div>
    );
}
