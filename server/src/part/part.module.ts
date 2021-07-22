import { Module } from '@nestjs/common';
import { PartController } from './part.controller';
import { PartService } from './part.service';
import { MongooseModule } from '@nestjs/mongoose';
import { partSchema } from '../schemas/part.schema';
import {userSchema} from '../schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Part', schema: partSchema }, { name: 'User', schema: userSchema }]),
    ],
    controllers: [PartController],
    providers: [PartService],
})
export class PartModule { }
