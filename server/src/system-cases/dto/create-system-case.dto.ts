import { Unit } from '../../interfaces/unit.interface';

export class CreateSystemCaseDto {
  readonly execution: string;
  readonly serialNumber: string;
  readonly fdsi: string;
  readonly part: string;
  readonly attachment: string;
  readonly created: number;
  readonly numberMachine: string;
  readonly back_color: string;
  readonly systemCaseUnits: Unit[];
}
