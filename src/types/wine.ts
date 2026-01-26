export type WineType = 'Red' | 'White' | 'Rose' | 'Sparkling' | 'Dessert' | 'Fortified';

export interface Wine {
    id: string;
    name: string;
    producer?: string;
    vintage: number;
    type: WineType;
    region: string;
    country: string;
    rating: number; // 0-5
    price?: number;
    tastingDate: string;
    notes?: string;
    imageUrl?: string;
}
