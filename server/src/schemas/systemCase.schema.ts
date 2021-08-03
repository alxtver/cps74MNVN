import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Unit } from '../interfaces/unit.interface';

export type systemCaseSchema = SystemCase & Document;

@Schema()
export class SystemCase {
  @Prop({ required: true, unique: true })
  serialNumber: string;

  @Prop()
  numberMachine: string;

  @Prop({ default: '' })
  execution: string;

  @Prop({ required: true })
  fdsi: string;

  @Prop({ required: true })
  part: string;

  @Prop()
  systemCaseUnits: Unit[];

  @Prop({ default: '#8989a7' })
  back_color: string;

  @Prop({ default: '' })
  attachment: string;

  @Prop({ default: () => Date.now() + 3 * 60 * 60 * 1000 })
  created: Date;
}

export const systemCaseSchema = SchemaFactory.createForClass(SystemCase);
