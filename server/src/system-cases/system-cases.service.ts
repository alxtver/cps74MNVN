import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSystemCaseDto } from './dto/create-system-case.dto';
import {InjectModel} from "@nestjs/mongoose";
import {SystemCase} from "./interfaces/system-case.interface";
import {Pki} from "../interfaces/pki.interface";
import {Apkzi} from "../interfaces/apkzi.interface";
import {Unit} from "../interfaces/unit.interface";


@Injectable()
export class SystemCasesService {
  constructor(
      @InjectModel('SystemCase')
      private readonly systemCaseModel: Model<SystemCase>,
      @InjectModel('Pki')
      private readonly pki: Model<Pki>,
      @InjectModel('Apkzi')
      private readonly apkzi: Model<Apkzi>,
  ) {}

  async getAllSystemCases(req): Promise<SystemCase[]> {
    return await this.systemCaseModel.find({ part: req.session.part }).exec();
  }

  async editSerialNumber(req) {
    const id: string = req.body.id
    const unit: Unit = req.body.unit
    const systemCase = await this.systemCaseModel.findById(id);
    // Ищем АПКЗИ
    const apkzi = await this.apkzi.find({part: req.session.part, kontr_zav_number: unit.serial_number})
    return `This action returns all systemCases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemCase`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemCase`;
  }
}
