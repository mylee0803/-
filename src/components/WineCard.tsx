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
            className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border cursor-pointer flex flex-col h-full bg-white`}
        >
            {/* Image Section */}
            <div className="relative h-52 overflow-hidden bg-stone-100">
                {wine.imageUrl ? (
                    <img
                        src={wine.imageUrl}
                        alt={wine.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center ${cardStyles}`}>
                        <Droplets className="w-12 h-12 opacity-20" />
                    </div>
                )}

                {/* Type Badge (Top Left) */}
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm ${labelStyles}`}>
                    {wine.type === 'Red' ? 'RED' :
                        wine.type === 'White' ? 'WHITE' :
                            wine.type === 'Rose' ? 'ROSE' :
                                wine.type === 'Sparkling' ? 'SPARKLING' :
                                    wine.type === 'Dessert' ? 'DESSERT' : 'FORTIFIED'}
                </div>

                {/* Rating (Top Right) */}
                {wine.rating > 0 && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-stone-800">{wine.rating}</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow relative">
                {/* Vintage & ABV Tag */}
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-stone-400 tracking-wider">
                        {wine.vintage > 0 ? wine.vintage : 'NV'}
                    </span>
                    {wine.abv && (
                        <span className="text-xs font-medium text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded border border-stone-100">
                            {wine.abv}%
                        </span>
                    )}
                </div>

                {/* Titles */}
                <div className="mb-4">
                    {/* Primary Title (Korean preferred) */}
                    <h3 className="text-lg font-serif font-bold text-stone-900 leading-tight mb-1 group-hover:text-wine-800 transition-colors line-clamp-1">
                        {wine.name_kr || wine.name}
                    </h3>

                    {/* Secondary Title (English Name) */}
                    {wine.name_kr && (
                        <p className="text-xs text-stone-500 font-medium line-clamp-1 mb-1">
                            {wine.name}
                        </p>
                    )}

                    {/* Producer */}
                    <p className="text-xs text-stone-400 line-clamp-1">
                        {wine.producer}
                    </p>
                </div>

                {/* Metadata Footer */}
                <div className="mt-auto pt-4 border-t border-stone-50 flex flex-col gap-1.5">
                    {/* Region */}
                    <div className="flex items-center gap-1.5 text-stone-500">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span className="text-xs truncate max-w-[180px]">
                            {wine.country} · {wine.region}
                        </span>
                    </div>

                    {/* Date & Price Row */}
                    <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1.5 text-stone-500">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                            <span className="text-xs">
                                {new Date(wine.tastingDate).toLocaleDateString()}
                            </span>
                        </div>

                        {wine.price && (
                            <span className="text-sm font-bold text-wine-900/80">
                                ₩{wine.price.toLocaleString()}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Hover Color Line at Bottom */}
            <div className={`h-1 w-full ${cardStyles.split(' ')[0].replace('bg-', 'bg-').replace('50', '200')}`} />
        </div>
    );
}
