import { Module } from '@nestjs/common';
import { ApkziService } from './apkzi.service';
import { ApkziController } from './apkzi.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {apkziSchema} from "../schemas/apkzi.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Apkzi', schema: apkziSchema },
    ]),
  ],
  controllers: [ApkziController],
  providers: [ApkziService]
})
export class ApkziModule {}
