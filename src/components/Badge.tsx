import type { ReactNode } from 'react';
import type { WineType } from '../types/wine';

interface BadgeProps {
    children: ReactNode;
    type?: WineType | string;
    className?: string;
}

export default function Badge({ children, type, className = '' }: BadgeProps) {
    let colorStyles = "bg-stone-100 text-stone-700";

    switch (type) {
        case 'Red':
            colorStyles = "bg-wine-50 text-wine-700 ring-1 ring-wine-100";
            break;
        case 'White':
            colorStyles = "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-100";
            break;
        case 'Rose':
            colorStyles = "bg-rose-50 text-rose-700 ring-1 ring-rose-100";
            break;
        case 'Sparkling':
            colorStyles = "bg-sky-50 text-sky-700 ring-1 ring-sky-100";
            break;
        case 'Dessert':
            colorStyles = "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
            break;
        default:
            colorStyles = "bg-stone-100 text-stone-700 ring-1 ring-stone-200";
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorStyles} ${className}`}>
            {children}
        </span>
    );
}
