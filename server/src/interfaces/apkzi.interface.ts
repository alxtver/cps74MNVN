import { Document } from 'mongoose';

export interface Apkzi extends Document {
    readonly apkzi_name: string;
    readonly kont_name: string;
    readonly fdsi: string;
    readonly fdsiKontr: string;
    readonly zav_number: string;
    readonly kontr_zav_number: string;
    readonly number_machine: string;
    readonly part: string;
    readonly created: Date;
}
