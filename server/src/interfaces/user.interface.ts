import { Document } from 'mongoose';
import { Apkzi } from './apkzi.interface';
import { Pki } from './pki.interface';

export interface User extends Document {
  readonly username: string;
  readonly group: string;
  readonly password: string;
  lastPart: string;
  readonly lastPage: number;
  readonly pcCount: string;
  readonly lastAssemblyPC: string;
  lastApkzi: Apkzi;
  lastPki: Pki;
}
