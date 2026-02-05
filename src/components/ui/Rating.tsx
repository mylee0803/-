import { useState, useEffect } from 'react';

interface RatingProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    max?: number;
    error?: string;
}

export default function Rating({ label, value, onChange, max = 5, error }: RatingProps) {
    // For slider visual feedback
    const displayValue = value;

    // Helper to determine star fill state
    const getStarState = (index: number) => {
        const starValue = index + 1;
        if (value >= starValue) return 'full';
        if (value >= starValue - 0.5) return 'half';
        return 'empty';
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-medium text-stone-700">
                    {label}
                </label>
                <span className="text-lg font-serif font-bold text-wine-600">
                    {displayValue.toFixed(1)} <span className="text-sm font-sans text-stone-400 font-normal">/ {max}</span>
                </span>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                {/* Stars Visualization */}
                <div className="flex items-center justify-center gap-1.5 mb-4">
                    {[...Array(max)].map((_, index) => {
                        const state = getStarState(index);
                        return (
                            <div key={index} className="relative w-8 h-8">
                                {/* Base Empty Star (Gray) */}
                                <svg
                                    className="w-full h-full text-stone-300 absolute top-0 left-0"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>

                                {/* Half Star (Gold, Clipped) */}
                                {state === 'half' && (
                                    <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                                        <svg
                                            className="w-8 h-8 text-gold-500"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    </div>
                                )}

                                {/* Full Star (Gold) */}
                                {state === 'full' && (
                                    <svg
                                        className="w-full h-full text-gold-500 absolute top-0 left-0"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Slider Input */}
                <div className="relative h-6 flex items-center">
                    <input
                        type="range"
                        min="0"
                        max={max}
                        step="0.5"
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-wine-600 focus:outline-none focus:ring-2 focus:ring-wine-500/20"
                    />
                </div>
                <div className="flex justify-between px-1 mt-1">
                    <span className="text-xs text-stone-400">0</span>
                    <span className="text-xs text-stone-400">{max}</span>
                </div>
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
