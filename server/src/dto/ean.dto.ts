export class EanDto {
  public type_pki: string;
  public vendor: string;
  public model: string;
  public country: string;
  public ean_code: string;
  public created: number;
  public countSymbols: number | null;
}
