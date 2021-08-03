import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { SystemCase } from '../system-cases/interfaces/system-case.interface';

export type pkiSchema = Pki & Document;

@Schema()
export class Pki {
  @Prop({ required: true })
  type_pki: string;

  @Prop({ required: true })
  vendor: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  serial_number: string;

  @Prop({ required: true })
  part: string;

  @Prop()
  country: string;

  @Prop()
  number_machine: string;

  @Prop()
  ean_code: string;

  @Prop()
  szz1: string;

  @Prop()
  sp_unit: [];

  @Prop({ default: () => Date.now() + 3 * 60 * 60 * 1000 })
  created: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SystemCase' })
  systemCase?: SystemCase;
}

export const pkiSchema = SchemaFactory.createForClass(Pki);
