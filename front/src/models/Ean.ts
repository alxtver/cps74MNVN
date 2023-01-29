export default class Ean {
    public _id: string | null = null; // id
    public type_pki = '';
    public vendor = '';
    public model = '';
    public country = '';
    public ean_code = '';
    public sp_unit: [];
    public sp_unit1: [];
    public created: number = Date.now();
}
