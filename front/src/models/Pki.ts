export default class Pki {
  public _id?: string | null = null; // id
  public type_pki = "";
  public vendor = "";
  public model = "";
  public serial_number = "";
  public part = "";
  public country = "";
  public number_machine = "";
  public ean_code = "";
  public szz1!: string;
  public sp_unit!: [];
  public created: number = Date.now();
  public viborka!: boolean;
  public!: string;
  public index?: number;
}
