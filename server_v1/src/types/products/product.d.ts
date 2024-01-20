// IProduct.ts
import { Document } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    colors: any[];
    sizes: any[];
    highlights: string[];
    discountPrice: number;
    deleted: boolean;
}
