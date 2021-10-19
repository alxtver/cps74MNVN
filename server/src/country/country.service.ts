import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../interfaces/country.interface';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel('Country')
    private readonly countryModel: Model<Country>,
  ) {}
  create(createCountryDto: CreateCountryDto) {
    return 'This action adds a new country';
  }

  async getAllCountries() {
    return await this.countryModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  async update(req) {
    return this.countryModel.findOneAndUpdate({ _id: req.body._id }, req.body);
  }

  async remove(id: string) {
    return await this.countryModel.findByIdAndDelete(id).exec();
  }
}
