import { Injectable } from '@nestjs/common';
import { Apkzi } from '../interfaces/apkzi.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pki } from '../interfaces/pki.interface';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

@Injectable()
export class ApkziService {
  constructor(
    @InjectModel('Apkzi')
    private readonly apkziModel: Model<Apkzi>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async editApkzi(req): Promise<Pki> {
    await this.apkziModel.findOneAndUpdate(
      { _id: req.body.apkzi._id },
      req.body.apkzi,
    );
    return req.body.apkzi;
  }

  async addApkzi(ApkziDto: Apkzi, req): Promise<Apkzi | string> {
    // если оставить id равным null то после сохранения прилетает
    // объект без id, хотя в базе сохраняется с id...
    if (ApkziDto._id === null) {
      delete ApkziDto._id;
    }
    // проверяем есть ли такой заводской номер в данной теме
    const findFactoryNumber: Apkzi[] = await this.apkziModel.find({
      part: req.session.part,
      zav_number: ApkziDto.zav_number,
    });
    // проверяем есть ли такой номер контроллера в данной теме
    const findControllerFactoryNumber: Apkzi[] = await this.apkziModel.find({
      part: req.session.part,
      kontr_zav_number: ApkziDto.kontr_zav_number,
    });

    if (
      findFactoryNumber.length > 0 ||
      findControllerFactoryNumber.length > 0
    ) {
      return 'notUniqueSerialNumber';
    }
    // добавляем пользователю идентификатор последнего добавленного АПКЗИ
    await this.userModel
      .findByIdAndUpdate(req.session.user._id, { lastApkzi: ApkziDto })
      .exec();

    return await new this.apkziModel(ApkziDto).save();
  }

  async getLastApkzi(req): Promise<Apkzi> {
    const user = await this.userModel.findById(req.session.user._id).exec();
    return user.lastApkzi;
  }

  async getAllApkzi(req): Promise<Apkzi[]> {
    return await this.apkziModel.find({ part: req.session.part }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} apkzi`;
  }

  async deleteApkzi(req): Promise<any> {
    return this.apkziModel.findOneAndDelete({ _id: req.body.id });
  }
}
