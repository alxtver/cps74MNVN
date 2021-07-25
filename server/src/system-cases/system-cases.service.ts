import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSystemCaseDto } from './dto/create-system-case.dto';
import {InjectModel} from "@nestjs/mongoose";
import {SystemCase} from "./interfaces/system-case.interface";


@Injectable()
export class SystemCasesService {
  constructor(
      @InjectModel('SystemCase')
      private readonly systemCaseModel: Model<SystemCase>,
  ) {}

  async getAllSystemCases(req): Promise<SystemCase[]> {
    return await this.systemCaseModel.find({ part: req.session.part }).exec();
  }

  findAll() {
    return `This action returns all systemCases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemCase`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemCase`;
  }
}
