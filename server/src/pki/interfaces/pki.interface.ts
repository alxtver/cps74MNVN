import { Document } from 'mongoose';

// @ts-ignore
export interface Pki extends Document {
  readonly type_pki: string;
  readonly vendor: string;
  readonly model: string;
  readonly serial_number: string;
  readonly part: string;
  readonly country: string;
  readonly number_machine: string;
  readonly ean_code: string;
  readonly szz1: string;
  readonly sp_unit: [];
  readonly created: number;
  readonly viborka: boolean;
  readonly: string;
}
