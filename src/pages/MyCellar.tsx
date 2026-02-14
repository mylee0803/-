import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchWines } from '../services/api';
import type { Wine } from '../types/wine';
import WineCard from '../components/WineCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function MyCellar() {
    const [wines, setWines] = useState<Wine[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');

    useEffect(() => {
        const loadWines = async () => {
            try {
                const data = await fetchWines();

                if (!Array.isArray(data)) {
                    console.error('[MyCellar] Data is not an array:', data);
                    throw new Error('Received invalid data format from server');
                }

                // Data is already flattened by n8n workflow
                const safeData: Wine[] = data.map((item: any) => {
                    // Helper to get image URL safely
                    const getImageUrl = (files: any[]) => {
                        if (Array.isArray(files) && files.length > 0) {
                            return files[0]?.file?.url || files[0]?.external?.url || files[0]?.url || undefined;
                        }
                        return undefined;
                    };

                    const imageUrl = getImageUrl(item.property_label_picture) || getImageUrl(item.property_main_picture);

                    return {
                        id: item.id || Math.random().toString(36).substr(2, 9),
                        // Try standard camelCase keys first (user claim), fallback to property_ snake_case (debug evidence)
                        nameEn: item.nameEn || item.property_name_en || '',
                        nameKr: item.nameKr || item.property_name_kr || '',
                        producer: item.producer || item.property_producer || '',
                        vintage: Number(item.vintage || item.property_vintage) || new Date().getFullYear(),
                        type: (item.type || item.property_type) || 'Red',
                        country: item.country || item.property_country || '',
                        variety: (item.variety?.rich_text?.[0]?.plain_text || item.properties?.variety?.rich_text?.[0]?.plain_text) || '',
                        region: item.region || item.property_region || '',
                        rating: Number(item.rating || item.property_rating) || 0,
                        price: Number(item.price || item.property_price) || undefined,
                        abv: (item.abv || item.property_abv) ? Number(item.abv || item.property_abv) : undefined,
                        date: item.date || item.property_date || new Date().toISOString(),
                        note: item.note || item.property_note || '',
                        imageUrl: imageUrl
                    };
                });

                // Data Mapping Debug logs removed for production

                setWines(safeData);
            } catch (err: any) {
                console.error('[MyCellar] Load Error:', err);
                const errorMessage = err.message || '와인 데이터를 불러오는데 실패했습니다.';
                setError(errorMessage);
                // Alert for mobile debugging
                alert(`[오류 발생] ${errorMessage}\n\n서버 연결 상태를 확인해주세요.`);
            } finally {
                setLoading(false);
            }
        };

        loadWines();
    }, []);

    const filteredWines = useMemo(() => {
        return wines.filter((wine) => {
            // Search by Korean Name, English Name, or Producer
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                (wine.nameKr?.toLowerCase().includes(query)) ||
                (wine.nameEn?.toLowerCase().includes(query)) ||
                (wine.producer?.toLowerCase().includes(query));

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
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-2">데이터를 불러오지 못했습니다</h3>
                <p className="text-stone-500 mb-6 max-w-md mx-auto">{error}</p>
                <div className="flex justify-center gap-3">
                    <Button onClick={() => window.location.reload()}>새로고침</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pb-24 relative min-h-screen bg-white">
            {/* Category Tabs - Sticky under header */}
            {/* Category Tabs - Sticky under header (Fixed 40px/80px) */}
            {/* Category Tabs - Sticky under header (Fixed 40px/80px) */}
            <div className="sticky top-[40px] md:top-[80px] h-[40px] flex items-center bg-white z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
                    <div
                        className="flex overflow-x-auto space-x-6 h-full items-center [&::-webkit-scrollbar]:hidden"
                        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                    >
                        {['All', 'Red', 'White', 'Sparkling', 'Rose', 'Dessert', 'Fortified'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`whitespace-nowrap relative z-10 py-2 px-1 text-base transition-all focus:outline-none h-[40px] flex items-center ${selectedType === type
                                    ? 'font-bold text-wine-900 shadow-[inset_0_-2px_0_0_#630E0A]'
                                    : 'font-medium text-stone-500 hover:text-stone-700'
                                    }`}
                            >
                                {type === 'All' ? '전체' :
                                    type === 'Red' ? '레드' :
                                        type === 'White' ? '화이트' :
                                            type === 'Sparkling' ? '스파클링' :
                                                type === 'Rose' ? '로제' :
                                                    type === 'Dessert' ? '디저트' : '주정강화'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Content Header (Count & Search) */}
            {/* Sticky Content Header (Count & Search) */}
            <div className="sticky top-[80px] md:top-[120px] z-30 bg-white px-4 sm:px-6 lg:px-8 pt-[10px]">
                <div className="flex justify-between items-center mb-0 gap-4">
                    <div className="text-sm ml-[10px] mb-[3px] text-[#404040] whitespace-nowrap">
                        총 <span className="font-semibold text-wine-900">{filteredWines.length}</span><span className="font-normal">개</span>
                    </div>

                    <div className="flex items-center">
                        {/* Inline Search Bar */}
                        {isSearchOpen && (
                            <div className="animate-in fade-in slide-in-from-right-2 duration-200 w-[216px] mr-2 ml-auto flex items-center mb-[8px]">
                                <Input
                                    label=""
                                    autoFocus
                                    placeholder="와인명/생산자"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-[32px] border-[1px] border-stone-200 text-xs py-0 px-2 focus:ring-0 focus:border-stone-200 focus-visible:ring-0 outline-none rounded-md placeholder:text-stone-300 shadow-sm"
                                />
                            </div>
                        )}

                        {/* Search Icon Toggle */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 text-[#404040] hover:text-wine-900 transition-colors mb-[2.5px]"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Separator Line */}
                <div className="h-px bg-stone-100 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] mb-4 -mx-4 sm:-mx-6 lg:-mx-8"></div>
            </div>

            {/* Scrollable Wine List */}
            <div className="px-4 sm:px-6 lg:px-8 bg-white overflow-visible">
                {filteredWines.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <p className="text-stone-500 mt-1">새로운 와인을 등록해보세요.</p>
                    </div>
                )}
            </div>

            {/* Floating Action Button (Centered above bottom nav) */}
            <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50">
                <Link to="/add">
                    <button className="bg-[#EF1403] hover:bg-[#c60b00] text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 h-10 px-6 rounded-full whitespace-nowrap">
                        <span className="text-sm font-bold">와인 등록</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
