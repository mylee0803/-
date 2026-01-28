import type { ReactNode } from 'react';
import type { WineType } from '../types/wine';

interface BadgeProps {
    children: ReactNode;
    type?: WineType | string;
    className?: string;
}

export default function Badge({ children, type, className = '' }: BadgeProps) {
    let colorStyles = "bg-stone-100 text-stone-700 ring-1 ring-stone-200";

    // Customize type string to match cases regardless of input casing
    const normalizeType = (t?: string) => {
        if (!t) return 'Unknown';
        const lower = t.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    const normalizedType = normalizeType(typeof type === 'string' ? type : 'Unknown');

    switch (normalizedType) {
        case 'Red':
            colorStyles = "bg-red-50 text-red-900 ring-1 ring-red-100";
            break;
        case 'White':
            colorStyles = "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-200/50";
            break;
        case 'Rose':
            colorStyles = "bg-rose-50 text-rose-900 ring-1 ring-rose-200/50";
            break;
        case 'Sparkling':
            colorStyles = "bg-sky-50 text-sky-900 ring-1 ring-sky-200/50";
            break;
        case 'Dessert':
            colorStyles = "bg-amber-50 text-amber-900 ring-1 ring-amber-200/50";
            break;
        case 'Fortified':
            colorStyles = "bg-purple-50 text-purple-900 ring-1 ring-purple-200/50";
            break;
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${colorStyles} ${className}`}>
            {children}
        </span>
    );
}
