import { Document } from 'mongoose';
import { Unit } from './unit.interface';

export interface Pc extends Document {
  readonly execution: string;
  serial_number: string;
  readonly fdsi: string;
  readonly part: string;
  readonly attachment: string;
  readonly created: number;
  readonly arm: string;
  numberMachine: string;
  readonly back_color: string;
  pc_unit: Unit[];
  system_case_unit: Unit[];
}
