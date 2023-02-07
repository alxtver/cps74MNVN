import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import converter from '../helper/Converter';
import { Ean } from '../interfaces/ean.interface';
import { Pki } from '../interfaces/pki.interface';
import { Pc } from '../interfaces/pc.interface';
import { SystemCase } from '../system-cases/interfaces/system-case.interface';

@Injectable()
export class PkiService {
  constructor(
    @InjectModel('Pki')
    private readonly pkiModel: Model<Pki>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Ean')
    private readonly eanModel: Model<Ean>,
    @InjectModel('Pc')
    private readonly pcModel: Model<Pc>,
    @InjectModel('SystemCase')
    private readonly systemCaseModel: Model<SystemCase>,
  ) {}

  async getAllPki(part: string): Promise<Pki[]> {
    return await this.pkiModel.find({ part }).exec();
  }

  async addPki(PkiDto: Pki, req): Promise<Pki | string> {
    // если оставить id равным null то после сохранения прилетает
    // объект без id, хотя в базе сохраняется с id...
    if (PkiDto._id === null) {
      delete PkiDto._id;
    }
    // проверяем есть ли такой серийник в данной теме
    const findSN: Pki[] = await this.pkiModel.find({
      part: req.session.part,
      serial_number: PkiDto.serial_number,
    });
    if (findSN.length > 0) {
      return 'notUniqueSerialNumber';
    }
    // Проверяем штрих-код, если есть, пропускаем, если нет заносим новый
    if (PkiDto.ean_code) {
      const ean = await this.eanModel.findOne({ ean_code: PkiDto.ean_code });
      if (!ean) {
        const newEan = Object.assign(await new this.eanModel(), PkiDto);
        await newEan.save();
      }
    }
    // добавляем пользователю идентификатор последнего добавленного ПКИ
    await this.userModel
      .findByIdAndUpdate(req.session.user._id, { lastPki: PkiDto })
      .exec();
    return await new this.pkiModel(PkiDto).save();
  }

  async getLastPki(req): Promise<Pki> {
    const user = await this.userModel.findById(req.session.user._id).exec();
    return user.lastPki;
  }

  async editPki(req): Promise<Pki> {
    const pki = req.body.pki;
    if (pki.number_machine) {
      await this.editPkiInSystemCase(pki, req.session.part);
      await this.editPkiInPc(pki, req.session.part);
    }

    await this.pkiModel.findOneAndUpdate(
      { _id: req.body.pki._id },
      req.body.pki,
    );
    return req.body.pki;
  }

  async deletePki(req): Promise<Pki> {
    const pki = await this.pkiModel.findById(req.body.id);
    // если пки привязан к машине, то ищем системный блок или пк к которому он привязан и удаляем
    if (pki.number_machine) {
      await this.deletePkiInSystemCase(
        pki.number_machine,
        pki.serial_number,
        req.session.part,
      );
      await this.deletePkiInPc(
        pki.number_machine,
        pki.serial_number,
        req.session.part,
      );
    }
    return this.pkiModel.findOneAndDelete({ _id: req.body.id });
  }

  async deletePkiInPc(
    pcSerialNumber: string,
    pkiSerialNumber: string,
    part: string,
  ): Promise<void> {
    const pc = await this.pcModel.findOne({
      part: part,
      serial_number: pcSerialNumber,
    });

    if (pc) {
      pc.pc_unit = pc.pc_unit.map((unit) => {
        if (unit.serial_number === pkiSerialNumber) {
          unit.name = 'Н/Д';
          unit.serial_number = '';
        }
        return unit;
      });
      pc.markModified('pc_unit');
      await pc.save();
    }
  }

  async deletePkiInSystemCase(
    systemCaseSerialNumber: string,
    pkiSerialNumber: string,
    part: string,
  ): Promise<void> {
    const systemCase = await this.systemCaseModel.findOne({
      part: part,
      serialNumber: systemCaseSerialNumber,
    });
    if (systemCase) {
      systemCase.systemCaseUnits = systemCase.systemCaseUnits.map((unit) => {
        if (unit.serial_number === pkiSerialNumber) {
          unit.name = 'Н/Д';
          unit.serial_number = '';
        }
        return unit;
      });
      await this.updatePC(systemCase, part);
      systemCase.markModified('systemCaseUnits');
      await systemCase.save();
    }
  }

  async editPkiInSystemCase(pki: Pki, part: string): Promise<void> {
    const systemCase = await this.systemCaseModel.findOne({
      part: part,
      serialNumber: pki.number_machine,
    });
    if (systemCase) {
      systemCase.systemCaseUnits = systemCase.systemCaseUnits.map((unit) => {
        if (unit.serial_number === pki.serial_number) {
          // изменяем системный блок
          unit.type = pki.type_pki;
          unit.name = `${pki.vendor} ${pki.model}`;
          unit.serial_number = pki.serial_number;
        }
        return unit;
      });
      await this.updatePC(systemCase, part);
      systemCase.markModified('systemCaseUnits');
      await systemCase.save();
    }
  }

  async editPkiInPc(pki: Pki, part: string): Promise<void> {
    const pc = await this.pcModel.findOne({
      part: part,
      serial_number: pki.number_machine,
    });

    if (pc) {
      pc.pc_unit = pc.pc_unit.map((unit) => {
        if (unit.serial_number === pki.serial_number) {
          unit.type = pki.type_pki;
          unit.name = `${pki.vendor} ${pki.model}`;
          unit.serial_number = pki.serial_number;
        }
        return unit;
      });
      pc.markModified('pc_unit');
      await pc.save();
    }
  }

  async updatePC(systemCase: SystemCase, part) {
    if (systemCase.numberMachine) {
      const pc = await this.pcModel.findOne({
        part: part,
        serial_number: systemCase.numberMachine,
      });
      pc.system_case_unit = systemCase.systemCaseUnits;
      pc.markModified('system_case_unit');
      await pc.save();
    }
  }

  async autocompleteTypesPki(req): Promise<string[]> {
    const types = await this.pkiModel.find().distinct('type_pki');
    return this.autocompleteQuery(types, req.query.query);
  }

  async autocompleteVendors(req): Promise<string[]> {
    const vendors = await this.pkiModel.find().distinct('vendor');
    return this.autocompleteQuery(vendors, req.query.query);
  }

  async autocompleteCountries(req): Promise<string[]> {
    const countries = await this.pkiModel.find().distinct('country');
    return this.autocompleteQuery(countries, req.query.query);
  }

  autocompleteQuery(arr: string[], query: string): string[] {
    const ruToEnQueryText = converter.translate(query).ruToEnLeather;
    const enToRuQueryText = converter.translate(query).enToRuLeather;
    if (query === '') {
      return [];
    }
    return arr.filter((item) => {
      return (
        item
          .toLocaleLowerCase()
          .includes(ruToEnQueryText.toLocaleLowerCase()) ||
        item.toLocaleLowerCase().includes(enToRuQueryText.toLocaleLowerCase())
      );
    });
  }
}
