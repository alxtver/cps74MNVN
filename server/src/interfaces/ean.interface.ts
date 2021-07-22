import { Document } from 'mongoose';

export interface Ean extends Document {
    readonly type_pki: string;
    readonly vendor: string;
    readonly model: string;
    readonly country: string;
    readonly ean_code: string;
    readonly created: number;
    readonly countSymbols: number;
}
