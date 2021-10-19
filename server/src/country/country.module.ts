import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { countrySchema } from '../schemas/country.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Country', schema: countrySchema }]),
  ],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
