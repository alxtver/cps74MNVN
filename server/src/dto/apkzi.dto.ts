export class ApkziDto {
  public _id: string | null;
  public fdsi: string;
  public apkzi_name: string;
  public kont_name: string;
  public zav_number: string;
  public kontr_zav_number: string;
  public part: string;
  public number_machine: string;
  public fdsiKontr: string;
  public created: number = Date.now();
}
