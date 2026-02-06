import { useState, useMemo } from 'react';
import { mockWines } from '../data/mockWines';
import TastingNoteCard from '../components/TastingNoteCard';
import Input from '../components/ui/Input';

export default function TastingNotes() {
    const [searchQuery, setSearchQuery] = useState('');

    const sortedNotes = useMemo(() => {
        return mockWines
            .filter((wine) => {
                return wine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    wine.producer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    wine.notes?.toLowerCase().includes(searchQuery.toLowerCase());
            })
            .sort((a, b) => new Date(b.tastingDate).getTime() - new Date(a.tastingDate).getTime());
    }, [searchQuery]);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-wine-950 mb-4">테이스팅 저널</h1>
                <p className="text-lg text-stone-500 max-w-2xl mx-auto">
                    나만의 감각적인 기록. 모든 와인의 향과 추억을 다시 떠올려보세요.
                </p>
            </div>

            <div className="mb-10 sticky top-24 z-30 bg-stone-50/95 backdrop-blur-sm py-4 border-none shadow-none">
                <div className="max-w-xl mx-auto">
                    <Input
                        label=""
                        placeholder="이름, 생산자, 향 등으로 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="shadow-sm"
                    />
                </div>
            </div>

            <div className="space-y-8">
                {sortedNotes.length > 0 ? (
                    sortedNotes.map((wine) => (
                        <TastingNoteCard key={wine.id} wine={wine} />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-stone-500">검색 결과와 일치하는 테이스팅 노트가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
