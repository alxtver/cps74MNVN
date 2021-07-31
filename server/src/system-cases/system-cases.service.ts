import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSystemCaseDto } from './dto/create-system-case.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SystemCase } from './interfaces/system-case.interface';
import { Pki } from '../interfaces/pki.interface';
import { Apkzi } from '../interfaces/apkzi.interface';
import { Unit } from '../interfaces/unit.interface';
import { type } from 'os';

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

  public async editSerialNumber(req) {
    const id: string = req.body.id;
    const unit: Unit = req.body.unit;
    const systemCase = await this.systemCaseModel.findById(id);
    // Ищем АПКЗИ
    const apkzi = await this.apkzi.findOne({
      part: req.session.part,
      kontr_zav_number: unit.serial_number,
    });
    if (apkzi) {
      debugger;
    }
    // Ищем ПКИ
    const pki: Pki = await this.pki.findOne({
      part: req.session.part,
      serial_number: unit.serial_number,
    });
    if (pki) {
      const find = systemCase.systemCaseUnits.find(
        (systemCaseUnit) => systemCaseUnit.i === unit.i,
      );
      find.type = pki.type_pki;
      find.name = `${pki.vendor} ${pki.model}`;
      find.serial_number = pki.serial_number;
      systemCase.markModified('systemCaseUnits');
      await systemCase.save();
      return find;
    }
    unit.name = 'Н/Д';
    systemCase.markModified('systemCaseUnits');
    await systemCase.save();
    return unit;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemCase`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemCase`;
  }
}
