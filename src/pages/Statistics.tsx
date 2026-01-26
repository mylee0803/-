import { useMemo } from 'react';
import { mockWines } from '../data/mockWines';
import type { Wine } from '../types/wine';
import StatCard from '../components/stats/StatCard';
import TypeChart from '../components/stats/TypeChart';

// Simplified icons as SVG components
const WineIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
);

const StarIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

const MoneyIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default function Statistics() {
    const stats = useMemo(() => {
        const totalWines = mockWines.length;
        const totalValue = mockWines.reduce((sum: number, wine: Wine) => sum + (wine.price || 0), 0);
        const avgRating = totalWines > 0
            ? (mockWines.reduce((sum: number, wine: Wine) => sum + wine.rating, 0) / totalWines).toFixed(1)
            : '0.0';

        return { totalWines, totalValue, avgRating };
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-10">
                <h1 className="text-3xl font-serif font-bold text-wine-950">Cellar Statistics</h1>
                <p className="text-stone-500 mt-2">Insights into your collection and preferences.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    label="Total Wines"
                    value={stats.totalWines}
                    icon={<WineIcon />}
                    trend="+2 this month"
                />
                <StatCard
                    label="Average Rating"
                    value={stats.avgRating}
                    icon={<StarIcon />}
                    trend="Top 10%"
                />
                <StatCard
                    label="Total Value"
                    value={`$${stats.totalValue.toLocaleString()}`}
                    icon={<MoneyIcon />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Distribution Chart */}
                <TypeChart wines={mockWines} />

                {/* Placeholder for future charts */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-center text-stone-400 h-96">
                    <div className="text-center">
                        <p className="text-lg font-medium">Coming Soon</p>
                        <p className="text-sm">More insights on vintage and region.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
