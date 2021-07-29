import {Controller, Get, Post, Body, Put, Param, Delete, Req, Res, HttpStatus} from '@nestjs/common';
import { SystemCasesService } from './system-cases.service';
import { CreateSystemCaseDto } from './dto/create-system-case.dto';

@Controller('systemCase')
export class SystemCasesController {
  constructor(private readonly systemCasesService: SystemCasesService) {}

  /**
   * Получить системные блоки за текущую тему
   * @param req
   * @param res
   */
  @Get('')
  async getAllSystemCases(@Req() req, @Res() res) {
    const systemCases = await this.systemCasesService.getAllSystemCases(req);
    return res.status(HttpStatus.OK).json(systemCases);
  }
  // @Post()
  // create(@Body() createSystemCaseDto: CreateSystemCaseDto) {
  //   return this.systemCasesService.create(createSystemCaseDto);
  // }


  /**
   * Ввод серийного номера ПКИ
   */
  @Put('editSerialNumber')
  async editSerialNumber(@Req() req, @Res() res) {
    return this.systemCasesService.editSerialNumber(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemCasesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemCasesService.remove(+id);
  }
}
