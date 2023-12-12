import {Document, Model} from 'mongoose';

export interface IOrder extends Document {
    items: any[];
    totalAmount: number;
    totalItems: number;
    user: string;
    paymentMethod: string;
    status: string;
    selectedAddress: any[];
}