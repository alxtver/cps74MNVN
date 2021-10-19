import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemCase } from '../system-cases/interfaces/system-case.interface';
import { Pki } from '../interfaces/pki.interface';
import { Pc } from '../interfaces/pc.interface';
import stringHelper from '../helper/StringHelper';
import * as mongoose from 'mongoose';
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
      serial_number: currentSN,
    });
    const allPcSerialNumbers = await this.pcModel
      .find({ part: req.session.part })
      .distinct('serial_number');
    const serialNumbers = [firstSN];
    while (lastSN && firstSN !== lastSN) {
      firstSN = stringHelper.plusOne(firstSN);
      serialNumbers.push(firstSN);
    }
    const pcForSave = [];
    for (const serialNumber of serialNumbers) {
      if (allPcSerialNumbers.includes(serialNumber)) {
        continue;
      }
      const newPc: Pc = await new this.pcModel(pcForCopy);
      newPc._id = mongoose.Types.ObjectId();
      newPc.isNew = true;
      newPc.serial_number = serialNumber;
      newPc.system_case_unit = [];
      newPc.created = Date.now() + 3 * 60 * 60 * 1000;
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
      pcForSave.push(newPc);
    }
    return await this.pcModel.insertMany(pcForSave);
  }

  async getByNumber(serialNumber, req): Promise<Pc> {
    return await this.pcModel
      .findOne({ part: req.session.part, serialNumber: serialNumber })
      .exec();
  }

  public async editSystemCaseSerialNumber(req) {
    const id: string = req.body.id;
    const unit: Unit = req.body.unit;
    const serialNumber = unit.serial_number;
    const part = req.session.part;
    const pc = await this.pcModel.findById(id);
    const editableUnit: Unit = pc.pc_unit.find((pcUnit) => pcUnit.i === unit.i);
    const systemCase = await this.systemCaseModel.findOne({
      part: part,
      serialNumber: serialNumber,
    });
    if (!systemCase) {
      pc.system_case_unit = [];
      editableUnit.fdsi = '';
      editableUnit.serial_number = serialNumber;
      editableUnit.name = 'Н/Д';
      pc.markModified('pc_unit');
      await pc.save();
      return {
        systemCaseUnits: [],
        editableUnit,
        message: 'Системный блок не найден',
        oldPc: null,
      };
    }
    if (systemCase) {
      let message = '';
      let oldPc = null;
      if (
        systemCase.numberMachine &&
        systemCase.numberMachine !== pc.serial_number
      ) {
        oldPc = await this.pcModel.findOne({
          part: part,
          serial_number: systemCase.numberMachine,
        });
        if (oldPc) {
          const oldPCEditableUnit: Unit = oldPc.pc_unit.find(
            (pcUnit) => pcUnit.serial_number === systemCase.serialNumber,
          );
          if (oldPCEditableUnit) {
            oldPCEditableUnit.fdsi = '';
            oldPCEditableUnit.serial_number = '';
            oldPCEditableUnit.name = 'Н/Д';
          }
          oldPc.system_case_unit = [];
          await oldPc.save();
          message = `Системный блок был привязан к ПЭВМ с номером ${systemCase.numberMachine}`;
        }
      }
      // изменяем ПЭВМ
      editableUnit.fdsi = systemCase.fdsi || '';
      editableUnit.serial_number = systemCase.serialNumber;
      editableUnit.name = '';
      pc.markModified('pc_unit');
      pc.system_case_unit = systemCase.systemCaseUnits;
      systemCase.numberMachine = pc.serial_number;
      await pc.save();
      await systemCase.save();
      return {
        systemCaseUnits: systemCase.systemCaseUnits,
        editableUnit,
        message: message,
        oldPc: oldPc,
      };
    }
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
    const pc: Pc = await this.pcModel.findById(req.body._id);
    // если поменялся серийный номер, то меняем привязку у ПКИ
    if (pc.serial_number !== req.body.serial_number) {
      await this.pki.updateMany(
        { part: req.session.part, number_machine: pc.serial_number },
        { $set: { number_machine: req.body.serial_number } },
      );
    }
    return this.pcModel.findOneAndUpdate({ _id: req.body._id }, req.body);
  }

  async remove(id: string, req) {
    const pc: Pc = await this.pcModel.findById(id);
    await this.pki.updateMany(
      { part: req.session.part, number_machine: pc.serial_number },
      { $set: { number_machine: '' } },
    );
    await this.systemCaseModel.updateOne(
      { part: req.session.part, numberMachine: pc.serial_number },
      { $set: { numberMachine: '' } },
    );
    try {
      await this.pcModel.findByIdAndRemove(id);
      return id;
    } catch (e) {
      return e;
    }
  }
}
