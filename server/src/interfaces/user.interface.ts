import { Document } from 'mongoose';

export interface User extends Document {
    readonly username: string;
    readonly group: string;
    readonly password: string;
    lastPart: string;
    readonly lastPage: number;
    readonly pcCount: string;
    readonly lastAssemblyPC: string;
}
