export class PkiDto {
    public _id: string | null;
    public type_pki: string;
    public vendor: string;
    public model: string;
    public serial_number: string;
    public part: string;
    public country: string;
    public number_machine: string;
    public ean_code: string;
    public szz1: string;
    public sp_unit: [];
    public created: number = Date.now();
    public viborka: boolean;
}
