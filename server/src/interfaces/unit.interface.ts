import { Document } from 'mongoose';

export interface Unit extends Document {
    readonly _id?: string;
    readonly i: number;
    readonly fdsi: string;
    readonly type: string;
    readonly name: string;
    readonly quantity: string;
    readonly serial_number: string;
    readonly notes: string;
}
