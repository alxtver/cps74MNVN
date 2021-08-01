import { Document } from 'mongoose';

// @ts-ignore
export interface Ean extends Document {
  readonly type_pki: string;
  readonly vendor: string;
  readonly model: string;
  readonly country: string;
  readonly ean_code: string;
  readonly created: number;
  readonly countSymbols: number;
}
