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
                <h1 className="text-4xl font-serif font-bold text-wine-950 mb-4">Tasting Journal</h1>
                <p className="text-lg text-stone-500 max-w-2xl mx-auto">
                    A collection of your sensory experiences. Revisit the flavors and memories of every bottle.
                </p>
            </div>

            <div className="mb-10 sticky top-24 z-30 bg-stone-50/95 backdrop-blur-sm py-4 border-b border-stone-200">
                <div className="max-w-xl mx-auto">
                    <Input
                        label=""
                        placeholder="Search notes by name, producer, or flavor..."
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
                        <p className="text-stone-500">No tasting notes found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
