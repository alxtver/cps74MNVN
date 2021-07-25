import { Module } from '@nestjs/common';
import { ApkziService } from './apkzi.service';
import { ApkziController } from './apkzi.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { apkziSchema } from '../schemas/apkzi.schema';
import { userSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Apkzi', schema: apkziSchema },
      { name: 'User', schema: userSchema },
    ]),
  ],
  controllers: [ApkziController],
  providers: [ApkziService],
})
export class ApkziModule {}
