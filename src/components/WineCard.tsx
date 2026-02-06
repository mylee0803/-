import { MapPin, Calendar, Star, Droplets } from 'lucide-react';
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
            className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border cursor-pointer flex flex-row h-36 bg-white`}
        >
            {/* Image Section (Left, Square) */}
            <div className="relative w-36 h-full flex-shrink-0 bg-stone-100 overflow-hidden">
                {wine.imageUrl ? (
                    <img
                        src={wine.imageUrl}
                        alt={wine.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center ${cardStyles}`}>
                        <Droplets className="w-8 h-8 opacity-20" />
                    </div>
                )}

                {/* Type Badge (Top Left, Small) */}
                <div className={`absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md shadow-sm ${labelStyles}`}>
                    {wine.type === 'Red' ? 'RED' :
                        wine.type === 'White' ? 'WHT' :
                            wine.type === 'Rose' ? 'ROS' :
                                wine.type === 'Sparkling' ? 'SPK' :
                                    wine.type === 'Dessert' ? 'DST' : 'PRT'}
                </div>
            </div>

            {/* Content Section (Right) */}
            <div className="flex-grow p-4 flex flex-col justify-between relative overflow-hidden">
                {/* Rating (Absolute Top Right) */}
                {wine.rating > 0 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-stone-600">{wine.rating}</span>
                    </div>
                )}

                <div>
                    {/* Primary Title (Korean preferred) */}
                    <h3 className="text-lg font-serif font-bold text-stone-900 leading-tight mb-0.5 group-hover:text-wine-800 transition-colors line-clamp-1 pr-8">
                        {wine.name_kr || wine.name}
                    </h3>

                    {/* Secondary Title (English Name) - Below Korean */}
                    <p className="text-xs text-stone-400 font-medium line-clamp-1 mb-2 pr-4">
                        {wine.name_kr ? wine.name : wine.producer}
                    </p>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                        <span className="font-semibold text-wine-900/80">
                            {wine.vintage > 0 ? wine.vintage : 'NV'}
                        </span>
                        <span className="w-0.5 h-2.5 bg-stone-300"></span>
                        <span className="truncate max-w-[100px]">
                            {wine.country}
                        </span>
                        {wine.abv && (
                            <>
                                <span className="w-0.5 h-2.5 bg-stone-300"></span>
                                <span className="text-stone-400">{wine.abv}%</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer Icon Row */}
                <div className="flex items-center justify-between mt-1 pt-2 border-t border-stone-100">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-stone-400">
                            <MapPin className="w-3 h-3" />
                            <span className="text-[10px] truncate max-w-[80px]">
                                {wine.region}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-400">
                            <Calendar className="w-3 h-3" />
                            <span className="text-[10px]">
                                {new Date(wine.tastingDate).toLocaleDateString().slice(2)}
                            </span>
                        </div>
                    </div>

                    {wine.price && (
                        <span className="text-xs font-bold text-stone-900">
                            ₩{(wine.price / 10000).toFixed(0)}만
                        </span>
                    )}
                </div>
            </div>

            {/* Hover Color Line at Left Border (optional accent) */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${cardStyles.split(' ')[0].replace('bg-', 'bg-').replace('50', '400')} opacity-0 group-hover:opacity-100 transition-opacity`} />
        </div>
    );
}
