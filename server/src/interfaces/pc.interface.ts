import { Document } from 'mongoose';
import { Unit } from './unit.interface';

export interface Pc extends Document {
  readonly execution: string;
  serial_number: string;
  fdsi: string;
  part: string;
  attachment: string;
  readonly created: number;
  arm: string;
  numberMachine: string;
  readonly back_color: string;
  pc_unit: Unit[];
  system_case_unit: Unit[];
}
