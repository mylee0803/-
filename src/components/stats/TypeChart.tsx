import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Wine } from '../../types/wine';

interface TypeChartProps {
    wines: Wine[];
}

export default function TypeChart({ wines }: TypeChartProps) {
    const typeCounts = wines.reduce((acc, wine) => {
        acc[wine.type] = (acc[wine.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const data = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));

    const COLORS: Record<string, string> = {
        'Red': '#c33535',
        'White': '#fbbf24',
        'Rose': '#fda4af',
        'Sparkling': '#bae6fd',
        'Dessert': '#fcd34d',
        'Fortified': '#78350f'
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-96">
            <h3 className="text-lg font-serif font-bold text-wine-950 mb-4">Wine Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#9ca3af'} strokeWidth={0} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
