import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SystemCase } from './interfaces/system-case.interface';
import { Apkzi } from '../interfaces/apkzi.interface';
import { Unit } from '../interfaces/unit.interface';
import modify from '../helper/SnModify';
import insert from '../helper/InsertSerialNumber';
import { Pki } from '../interfaces/pki.interface';
import stringHelper from '../helper/StringHelper';
import * as mongoose from 'mongoose';

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

  async getSerialNumbers(req): Promise<string[]> {
    const systemCases = await this.systemCaseModel.find({
      part: req.session.part,
    });
    return systemCases.map((systemCase) => {
      return systemCase.serialNumber;
    });
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

  async edit(req): Promise<SystemCase> {
    return this.systemCaseModel.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
    );
  }

  async copy(req): Promise<any> {
    const currentSN = req.body.serialNumber;
    let firstSN = req.body.firstSerialNumber;
    const lastSN = req.body.lastSerialNumber;
    const systemCaseForCopy = await this.systemCaseModel.findOne({
      part: req.session.part,
      serialNumber: currentSN,
    });
    const allSystemCaseSerialNumbers = await this.systemCaseModel
      .find({ part: req.session.part })
      .distinct('serialNumber');
    const serialNumbers = [firstSN];
    while (lastSN && firstSN !== lastSN) {
      firstSN = stringHelper.plusOne(firstSN);
      serialNumbers.push(firstSN);
    }
    const systemCasesForSave = [];
    for (const serialNumber of serialNumbers) {
      if (allSystemCaseSerialNumbers.includes(serialNumber)) {
        continue;
      }
      const newSystemCase = await new this.systemCaseModel(systemCaseForCopy);
      newSystemCase._id = mongoose.Types.ObjectId();
      newSystemCase.isNew = true;
      newSystemCase.serialNumber = serialNumber;
      const units = [];
      for (const unit of newSystemCase.systemCaseUnits) {
        const copyUnit = { ...unit };
        if (copyUnit.serial_number === systemCaseForCopy.serialNumber) {
          copyUnit.serial_number = serialNumber;
        } else if (!/[Бб].?[Нн]/g.test(copyUnit.serial_number)) {
          copyUnit.name = '';
          copyUnit.serial_number = '';
        }
        units.push(copyUnit);
      }
      newSystemCase.systemCaseUnits = units;
      systemCasesForSave.push(newSystemCase);
    }
    return await this.systemCaseModel.insertMany(systemCasesForSave);
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
