import { Document } from 'mongoose';

export interface Part extends Document {
  readonly part: string;
  readonly created: Date;
}
