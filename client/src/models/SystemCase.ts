import Unit from "@/models/Unit";

export default class SystemCase {
  public _id?: string | null = null; // id
  public execution = '';
  public serialNumber = '';
  public fdsi = '';
  public part = '';
  public attachment = '';
  public created: number = Date.now();
  public numberMachine = '';
  public back_color = '';
  public systemCaseUnits: Unit[] | null = null;
}
