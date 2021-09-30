import { Injectable } from '@nestjs/common';
import { Ean } from '../interfaces/ean.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EanService {
  constructor(
    @InjectModel('Ean')
    private readonly eanModel: Model<Ean>,
  ) {}

  create() {
    return 'This action adds a new ean';
  }

  async findAll(): Promise<Ean[]> {
    return await this.eanModel.find().exec();
  }

  async findOne(eanCode: string) {
    return await this.eanModel.find({ ean_code: eanCode }).exec();
  }

  async update(req) {
    return this.eanModel.findOneAndUpdate({ _id: req.body._id }, req.body);
  }

  async remove(id: string) {
    return await this.eanModel.findByIdAndDelete(id).exec();
  }
}
