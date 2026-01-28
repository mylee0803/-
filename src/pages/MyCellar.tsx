import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchWines } from '../services/api';
import type { Wine } from '../types/wine';
import WineCard from '../components/WineCard';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

export default function MyCellar() {
    const [wines, setWines] = useState<Wine[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');

    useEffect(() => {
        const loadWines = async () => {
            try {
                const data = await fetchWines();
                console.log('[MyCellar] Fetched data:', data);

                if (!Array.isArray(data)) {
                    console.error('[MyCellar] Data is not an array:', data);
                    throw new Error('Received invalid data format from server');
                }

                // Ensure data matches Wine interface partially
                const safeData: Wine[] = data.map((item: any) => ({
                    ...item,
                    id: item.id || Math.random().toString(36).substr(2, 9),
                    rating: Number(item.rating) || 0,
                    vintage: Number(item.vintage) || new Date().getFullYear(),
                    // Basic fallbacks
                    name: item.name || 'Unnamed Wine',
                    type: item.type || 'Red',
                    country: item.country || 'Unknown',
                    region: item.region || 'Unknown',
                    tastingDate: item.tastingDate || new Date().toISOString()
                }));

                setWines(safeData);
            } catch (err) {
                console.error(err);
                setError('Failed to load wines from your cellar.');
            } finally {
                setLoading(false);
            }
        };

        loadWines();
    }, []);

    const filteredWines = useMemo(() => {
        return wines.filter((wine) => {
            const matchesSearch = wine.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                wine.producer?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = selectedType === 'All' || wine.type === selectedType;

            return matchesSearch && matchesType;
        });
    }, [wines, searchQuery, selectedType]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wine-900 mx-auto mb-4"></div>
                <p className="text-stone-500">셀러를 불러오는 중입니다...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>다시 시도</Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-wine-950">내 와인 셀러</h1>
                    <p className="text-stone-500 mt-2">나만의 와인 컬렉션을 관리하고 상세한 시음 노트를 확인하세요.</p>
                </div>
                <Link to="/add">
                    <Button>와인 등록</Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-96">
                    <Input
                        label=""
                        placeholder="와인 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="w-full md:w-48">
                    <Select
                        label=""
                        options={[
                            { value: 'All', label: '전체 종류' },
                            { value: 'Red', label: '레드' },
                            { value: 'White', label: '화이트' },
                            { value: 'Rose', label: '로제' },
                            { value: 'Sparkling', label: '스파클링' },
                            { value: 'Dessert', label: '디저트' },
                            { value: 'Fortified', label: '주정강화' },
                        ]}
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    />
                </div>
                <div className="ml-auto text-sm text-stone-500">
                    총 <span className="font-semibold text-wine-900">{filteredWines.length}</span>개의 와인
                </div>
            </div>

            {/* Grid */}
            {filteredWines.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWines.map((wine) => (
                        <WineCard key={wine.id || Math.random()} wine={wine} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-200">
                    <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-stone-900">등록된 와인이 없습니다</h3>
                    <p className="text-stone-500 mt-1">검색어를 변경하거나 새로운 와인을 등록해보세요.</p>
                    <Link to="/add" className="inline-block mt-4">
                        <Button variant="outline" size="sm">와인 등록</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
