import {Document, Model} from 'mongoose';

export interface ICart extends Document {
    quantity: number;
    product: any;
    user: any;
}