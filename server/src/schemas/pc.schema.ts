import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Unit } from '../interfaces/unit.interface';

export type pcSchema = Pc & Document;

@Schema()
export class Pc {
  @Prop({ required: true, unique: true })
  serial_number: string;

  @Prop({ default: '' })
  execution: string;

  @Prop({ required: true })
  fdsi: string;

  @Prop({ required: true })
  part: string;

  @Prop()
  pc_unit: Unit[];

  @Prop()
  system_case_unit: Unit[];

  @Prop({ default: '#8989a7' })
  back_color: string;

  @Prop({ default: '' })
  attachment: string;

  @Prop({ default: '' })
  arm: string;

  @Prop({ default: () => Date.now() + 3 * 60 * 60 * 1000 })
  created: Date;
}

export const pcSchema = SchemaFactory.createForClass(Pc);
