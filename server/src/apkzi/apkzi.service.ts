import {HttpStatus, Injectable} from '@nestjs/common';
import { CreateApkziDto } from './dto/create-apkzi.dto';
import {Apkzi} from "../interfaces/apkzi.interface";
import {InjectModel} from "@nestjs/mongoose";
import {Pki} from "../interfaces/pki.interface";
import { Model } from 'mongoose';
import {User} from "../interfaces/user.interface";
import {Ean} from "../interfaces/ean.interface";

@Injectable()
export class ApkziService {
  constructor(
      @InjectModel('Apkzi')
      private readonly apkziModel: Model<Apkzi>,
  ) {}


  create(createApkziDto: CreateApkziDto) {
    return 'This action adds a new apkzi';
  }

  async getAllApkzi(req): Promise<Apkzi[]> {
    return await this.apkziModel.find({ part: req.session.part }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} apkzi`;
  }

  remove(id: number) {
    return `This action removes a #${id} apkzi`;
  }
}
