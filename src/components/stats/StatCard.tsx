import type { ReactNode } from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: ReactNode;
    trend?: string;
}

export default function StatCard({ label, value, icon, trend }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-4">
            <div className="p-3 bg-wine-50 rounded-xl text-wine-600">
                {icon}
            </div>
            <div>
                <p className="text-stone-500 text-sm font-medium">{label}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-wine-950 font-serif">{value}</h3>
                    {trend && <span className="text-xs font-medium text-green-600">{trend}</span>}
                </div>
            </div>
        </div>
    );
}
