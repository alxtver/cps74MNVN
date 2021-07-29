import { Module } from '@nestjs/common';
import { SystemCasesService } from './system-cases.service';
import { SystemCasesController } from './system-cases.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {pkiSchema} from "../schemas/pki.schema";
import {systemCaseSchema} from "../schemas/systemCase.schema";
import {apkziSchema} from "../schemas/apkzi.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SystemCase', schema: systemCaseSchema },
      { name: 'Pki', schema: pkiSchema },
      { name: 'Apkzi', schema: apkziSchema },
    ]),
  ],
  controllers: [SystemCasesController],
  providers: [SystemCasesService]
})
export class SystemCasesModule {}
