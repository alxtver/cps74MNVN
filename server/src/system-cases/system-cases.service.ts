import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SystemCase } from './interfaces/system-case.interface';
import { Apkzi } from '../interfaces/apkzi.interface';
import { Unit } from '../interfaces/unit.interface';
import modify from '../helper/SnModify';
import insert from '../helper/InsertSerialNumber';
import { Pki } from '../interfaces/pki.interface';

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
    const serialNumber = unit.serial_number;
    const part = req.session.part;
    const systemCase = await this.systemCaseModel.findById(id);
    // юнит системного блока, который будем редактировать
    const editableUnit: Unit = systemCase.systemCaseUnits.find(
      (systemCaseUnit) => systemCaseUnit.i === unit.i,
    );
    // Ищем АПКЗИ
    const apkzi = await this.apkzi.findOne({
      part: req.session.part,
      kontr_zav_number: serialNumber,
    });
    if (apkzi) {
      return insert.apkzi(this, apkzi, systemCase, unit, part);
    }

    // Ищем ПКИ
    let pki: Pki = await this.pki.findOne({
      part,
      serial_number: serialNumber,
    });
    if (!pki) {
      pki = await modify.reModify(serialNumber, part, this);
    }
    if (pki) {
      // изменяем системный блок
      editableUnit.type = pki.type_pki;
      editableUnit.name = `${pki.vendor} ${pki.model}`;
      editableUnit.serial_number = pki.serial_number;
      systemCase.markModified('systemCaseUnits');
      await systemCase.save();
      // меняем ПКИ
      pki.systemCase = systemCase;
      pki.number_machine = systemCase.serialNumber;
      await pki.save();
      return { editableUnit, message: '', oldSystemCase: null };
    }

    // действия если ничего не нашли
    editableUnit.name = 'Н/Д';
    systemCase.markModified('systemCaseUnits');
    await systemCase.save();
    return { editableUnit, message: '', oldSystemCase: null };
  }

  async create(req): Promise<SystemCase> {
    const newSystemCase = req.body;
    if (newSystemCase._id === null) {
      delete newSystemCase._id;
    }
    return await new this.systemCaseModel(newSystemCase).save();
  }

  findOne(id: number) {
    return `This action returns a #${id} systemCase`;
  }

  async remove(id: string) {
    try {
      await this.systemCaseModel.findByIdAndRemove(id);
      return id;
    } catch (e) {
      return e;
    }
  }
}
