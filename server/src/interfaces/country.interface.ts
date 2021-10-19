import { Document } from 'mongoose';

export interface Country extends Document {
  readonly country: string;
  readonly fullName: string;
}
