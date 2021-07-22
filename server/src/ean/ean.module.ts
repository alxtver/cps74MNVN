import { Module } from '@nestjs/common';
import { EanService } from './ean.service';
import { EanController } from './ean.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {eanSchema} from "../schemas/ean.schema";


@Module({imports: [
    MongooseModule.forFeature([{ name: 'Ean', schema: eanSchema}]),
  ],
  controllers: [EanController],
  providers: [EanService]
})
export class EanModule {}
