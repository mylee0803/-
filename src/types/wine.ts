export type WineType = 'Red' | 'White' | 'Rose' | 'Sparkling' | 'Dessert' | 'Fortified';

export interface Wine {
    id: string;
    nameEn: string;
    nameKr?: string;
    producer?: string;
    vintage: number;
    type: WineType;
    region: string;
    country: string;
    rating: number; // 0-5
    price?: number;
    abv?: number; // Alcohol by volume
    date: string; // Was tastingDate
    note?: string; // Was notes
    imageUrl?: string;
}
