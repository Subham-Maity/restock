// IProduct.ts
import { Document } from 'mongoose';

export interface IBanner extends Document {
    link: String,
    alt: String,
}
