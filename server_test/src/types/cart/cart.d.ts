import {Document, Model} from 'mongoose';

export interface ICart extends Document {
    quantity: number;
    user: any;
    product: any;
}