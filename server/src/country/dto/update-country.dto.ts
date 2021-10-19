import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryDto } from './create-country.dto';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
  _id: string;
  private country: string;
}
