import { Document } from 'mongoose';
import { Unit } from '../../interfaces/unit.interface';

export interface SystemCase extends Document {
  readonly execution: string;
  serialNumber: string;
  readonly fdsi: string;
  readonly part: string;
  readonly attachment: string;
  readonly created: number;
  numberMachine: string;
  readonly back_color: string;
  systemCaseUnits: Unit[];
}
