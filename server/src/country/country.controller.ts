import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Req,
  Res,
  Put,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }

  @Get()
  async getAllCountries(@Res() res) {
    const countries = await this.countryService.getAllCountries();
    return res.status(HttpStatus.OK).json(countries);
  }

  @Put()
  async update(@Req() req, @Res() res) {
    const response = await this.countryService.update(req);
    return res.status(HttpStatus.OK).json(response);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(id);
  }
}
