import { Module } from '@nestjs/common';
import { SystemCasesService } from './system-cases.service';
import { SystemCasesController } from './system-cases.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {pkiSchema} from "../schemas/pki.schema";
import {systemCaseSchema} from "../schemas/systemCase.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SystemCase', schema: systemCaseSchema },
      { name: 'Pki', schema: pkiSchema },
    ]),
  ],
  controllers: [SystemCasesController],
  providers: [SystemCasesService]
})
export class SystemCasesModule {}
