import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { PcService } from './pc.service';
import { Unit } from '../interfaces/unit.interface';
import { Pc } from '../interfaces/pc.interface';

@Controller('pc')
export class PcController {
  constructor(private readonly pcService: PcService) {}

  /**
   * Получить все ПЭВМ за тему
   * @param req
   * @param res
   */
  @Get()
  async getAllPc(@Req() req, @Res() res) {
    const allPc = await this.pcService.getAllPc(req);
    return res.status(HttpStatus.OK).json(allPc);
  }

  /**
   * Получить серийные номера ПЭВМ за тему
   * @param req
   * @param res
   */
  @Get('/serialNumbers')
  async getSerialNumbers(@Req() req, @Res() res) {
    const serialNumbers = await this.pcService.getSerialNumbers(req);
    return res.status(HttpStatus.OK).json(serialNumbers);
  }

  /**
   * Получить ПЭВМ по серийному номеру
   * @param serialNumber
   * @param req
   * @param res
   */
  @Get('/:serialNumber')
  async getPcBySerialNumber(
    @Param('serialNumber') serialNumber: string,
    @Req() req,
    @Res() res,
  ) {
    const pc = await this.pcService.getByNumber(serialNumber, req);
    return res.status(HttpStatus.OK).json(pc);
  }

  /**
   * Добавить ПЭВМ
   * @param req
   * @param res
   */
  @Post()
  async create(@Req() req, @Res() res) {
    try {
      const newPc = await this.pcService.create(req);
      return res.status(HttpStatus.OK).json(newPc);
    } catch (e) {
      return res.status(HttpStatus.CONFLICT).json(e);
    }
  }

  /**
   * Редактировать ПЭВМ
   * @param req
   * @param res
   */
  @Put()
  async edit(@Req() req, @Res() res) {
    const newPc = await this.pcService.edit(req);
    return res.status(HttpStatus.OK).json(newPc);
  }

  /**
   * Копирование ПЭВМ
   * @param req
   * @param res
   */
  @Post('copy')
  async copy(@Req() req, @Res() res) {
    const newPc = await this.pcService.copy(req);
    return res.status(HttpStatus.OK).json(newPc);
  }

  /**
   * Ввод серийного номера ПКИ
   */
  @Put('editSerialNumber')
  async editSerialNumber(
    @Req() req,
    @Res() res,
  ): Promise<{
    editableUnit: Unit;
    message: string;
    oldPc: Pc;
  }> {
    const response = await this.pcService.editSerialNumber(req);
    return res.status(HttpStatus.OK).json(response);
  }

  /**
   * Ввод серийного номера системного блока
   */
  @Put('editSystemCaseSerialNumber')
  async editSystemCaseSerialNumber(
    @Req() req,
    @Res() res,
  ): Promise<{
    systemCaseUnits: Unit[];
    editableUnit: Unit;
    message: string;
    oldPc: Pc;
  }> {
    const response = await this.pcService.editSystemCaseSerialNumber(req);
    return res.status(HttpStatus.OK).json(response);
  }

  /**
   * Удалить ПЭВМ
   * @param id
   * @param req
   */
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.pcService.remove(id, req);
  }
}
