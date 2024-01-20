import {Document, Model} from 'mongoose';

export interface ICategory extends Document {
    label: string;
    value: string;
    id?: string; // Optional, as it will be a virtual field,
}
