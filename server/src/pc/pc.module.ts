import { Module } from '@nestjs/common';
import { PcService } from './pc.service';
import { PcController } from './pc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { systemCaseSchema } from '../schemas/systemCase.schema';
import { pkiSchema } from '../schemas/pki.schema';
import { apkziSchema } from '../schemas/apkzi.schema';
import { pcSchema } from '../schemas/pc.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Pc', schema: pcSchema },
      { name: 'SystemCase', schema: systemCaseSchema },
      { name: 'Pki', schema: pkiSchema },
      { name: 'Apkzi', schema: apkziSchema },
    ]),
  ],
  controllers: [PcController],
  providers: [PcService],
})
export class PcModule {}
