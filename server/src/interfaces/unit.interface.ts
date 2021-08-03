import { Document } from 'mongoose';

export interface Unit extends Document {
  readonly _id?: string;
  readonly i: number;
  fdsi: string;
  type: string;
  name: string;
  readonly quantity: string;
  serial_number: string;
  readonly notes: string;
}
