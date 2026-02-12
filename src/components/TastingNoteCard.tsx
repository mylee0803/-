import type { Wine } from '../types/wine';
import Badge from './Badge';

interface TastingNoteCardProps {
    wine: Wine;
}

export default function TastingNoteCard({ wine }: TastingNoteCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow border border-stone-100 mb-6">
            <div className="flex flex-col md:flex-row gap-6">

                {/* Date Column */}
                <div className="md:w-32 flex-shrink-0">
                    <div className="text-sm font-bold text-stone-400 uppercase tracking-wide">
                        {new Date(wine.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="mt-2 text-wine-900 font-serif text-3xl font-bold">
                        {wine.rating}<span className="text-lg text-stone-300 font-sans font-normal">/5</span>
                    </div>
                    <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < wine.rating ? 'text-gold-500' : 'text-stone-200'} fill-current`} viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                    </div>
                </div>

                {/* Content Column */}
                <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-wine-950 hover:text-wine-700 transition-colors cursor-pointer">
                                {wine.nameKr || wine.nameEn}
                            </h3>
                            <p className="text-stone-500 font-medium">{wine.producer} <span className="text-stone-300 mx-2">•</span> {wine.vintage}</p>
                        </div>
                        <Badge type={wine.type}>{wine.type}</Badge>
                    </div>

                    <div className="prose prose-stone max-w-none mt-4">
                        <p className="text-stone-700 leading-relaxed text-lg italic">
                            "{wine.note}"
                        </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-md bg-stone-50 text-stone-600 text-sm border border-stone-200">
                            {wine.region}, {wine.country}
                        </span>
                        {wine.price && (
                            <span className="inline-flex items-center px-3 py-1 rounded-md bg-stone-50 text-stone-600 text-sm border border-stone-200">
                                ${wine.price}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
