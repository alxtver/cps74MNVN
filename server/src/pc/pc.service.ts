import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemCase } from '../system-cases/interfaces/system-case.interface';
import { Pki } from '../interfaces/pki.interface';
import { Pc } from '../interfaces/pc.interface';
import stringHelper from '../helper/StringHelper';
import mongoose from 'mongoose';
import { Unit } from '../interfaces/unit.interface';
import modify from '../helper/SnModify';

@Injectable()
export class PcService {
  constructor(
    @InjectModel('Pc')
    private readonly pcModel: Model<Pc>,
    @InjectModel('SystemCase')
    private readonly systemCaseModel: Model<SystemCase>,
    @InjectModel('Pki')
    private readonly pki: Model<Pki>,
  ) {}

  async getAllPc(req) {
    return this.pcModel.find({ part: req.session.part }).sort({ created: 1 });
  }

  async getSerialNumbers(req): Promise<string[]> {
    const pc = await this.pcModel.find({
      part: req.session.part,
    });
    return pc.map((onePc) => {
      return onePc.serial_number;
    });
  }

  async copy(req): Promise<any> {
    const currentSN = req.body.serialNumber;
    let firstSN = req.body.firstSerialNumber;
    const lastSN = req.body.lastSerialNumber;
    const pcForCopy = await this.pcModel.findOne({
      part: req.session.part,
      serialNumber: currentSN,
    });
    const allPcSerialNumbers = await this.pcModel
      .find({ part: req.session.part })
      .distinct('serial_number');
    const serialNumbers = [firstSN];
    while (lastSN && firstSN !== lastSN) {
      firstSN = stringHelper.plusOne(firstSN);
      serialNumbers.push(firstSN);
    }
    const systemCasesForSave = [];
    for (const serialNumber of serialNumbers) {
      if (allPcSerialNumbers.includes(serialNumber)) {
        continue;
      }
      const newPc: Pc = await new this.pcModel(pcForCopy);
      newPc._id = mongoose.Types.ObjectId();
      newPc.isNew = true;
      newPc.serial_number = serialNumber;
      // копирование состава ПЭВМ
      const pcUnits = [];
      for (const unit of newPc.pc_unit) {
        const copyUnit = { ...unit };
        if (copyUnit.serial_number === pcForCopy.serial_number) {
          copyUnit.serial_number = serialNumber;
        } else if (!/[Бб].?[Нн]/g.test(copyUnit.serial_number)) {
          copyUnit.name = '';
          copyUnit.serial_number = '';
        }
        pcUnits.push(copyUnit);
      }
      newPc.pc_unit = pcUnits;
      systemCasesForSave.push(newPc);
    }
    return await this.systemCaseModel.insertMany(systemCasesForSave);
  }

  async getByNumber(serialNumber, req): Promise<Pc> {
    return await this.pcModel
      .findOne({ part: req.session.part, serialNumber: serialNumber })
      .exec();
  }

  public async editSerialNumber(req) {
    const id: string = req.body.id;
    const unit: Unit = req.body.unit;
    const serialNumber = unit.serial_number;
    const part = req.session.part;
    const pc = await this.pcModel.findById(id);
    // юнит ПЭВМ, который будем редактировать
    const editableUnit: Unit = pc.pc_unit.find((pcUnit) => pcUnit.i === unit.i);

    // Ищем ПКИ
    let pki: Pki = await this.pki.findOne({
      part,
      serial_number: serialNumber,
    });
    if (!pki) {
      pki = await modify.reModify(serialNumber, part, this);
    }
    if (pki) {
      // изменяем ПЭВМ
      editableUnit.type = pki.type_pki;
      editableUnit.name = `${pki.vendor} ${pki.model}`;
      editableUnit.serial_number = pki.serial_number;
      pc.markModified('pc_unit');
      await pc.save();
      // меняем ПКИ
      pki.systemCase = pc;
      pki.number_machine = pc.serial_number;
      await pki.save();
      return { editableUnit, message: '', oldPc: null };
    }

    // действия если ничего не нашли
    editableUnit.name = 'Н/Д';
    editableUnit.serial_number = serialNumber;
    pc.markModified('pc_unit');
    await pc.save();
    return { editableUnit, message: '', oldPc: null };
  }

  async create(req): Promise<Pc> {
    const newPC = req.body;
    if (newPC._id === null) {
      delete newPC._id;
    }
    return await new this.pcModel(newPC).save();
  }

  async edit(req): Promise<Pc> {
    return this.pcModel.findOneAndUpdate({ _id: req.body._id }, req.body);
  }

  async remove(id: string) {
    try {
      await this.pcModel.findByIdAndRemove(id);
      return id;
    } catch (e) {
      return e;
    }
  }
}
