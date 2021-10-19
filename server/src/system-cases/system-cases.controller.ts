import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { SystemCasesService } from './system-cases.service';
import { Unit } from '../interfaces/unit.interface';
import { SystemCase } from './interfaces/system-case.interface';

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

  /**
   * Получить серийные номера системный блоков за тему
   * @param req
   * @param res
   */
  @Get('/serialNumbers')
  async getSerialNumbers(@Req() req, @Res() res) {
    const serialNumbers = await this.systemCasesService.getSerialNumbers(req);
    return res.status(HttpStatus.OK).json(serialNumbers);
  }

  /**
   * Получить системный блок по серийному номеру
   * @param serialNumber
   * @param req
   * @param res
   */
  @Get('/:serialNumber')
  async getSystemCaseBySerialNumber(
    @Param('serialNumber') serialNumber: string,
    @Req() req,
    @Res() res,
  ) {
    const systemCase = await this.systemCasesService.getByNumber(
      serialNumber,
      req,
    );
    return res.status(HttpStatus.OK).json(systemCase);
  }

  /**
   * Добавить системный блок
   * @param req
   * @param res
   */
  @Post()
  async create(@Req() req, @Res() res) {
    try {
      const newSystemCase = await this.systemCasesService.create(req);
      return res.status(HttpStatus.OK).json(newSystemCase);
    } catch (e) {
      return res.status(HttpStatus.CONFLICT).json(e);
    }
  }

  /**
   * Редактировать системный блок
   * @param req
   * @param res
   */
  @Put()
  async edit(@Req() req, @Res() res) {
    const newSystemCase = await this.systemCasesService.edit(req);
    return res.status(HttpStatus.OK).json(newSystemCase);
  }

  /**
   * Копирование системных блоков
   * @param req
   * @param res
   */
  @Post('copy')
  async copy(@Req() req, @Res() res) {
    const newSystemCases = await this.systemCasesService.copy(req);
    return res.status(HttpStatus.OK).json(newSystemCases);
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
    oldSystemCase: SystemCase;
  }> {
    const response = await this.systemCasesService.editSerialNumber(req);
    return res.status(HttpStatus.OK).json(response);
  }

  /**
   * Удалить системный блок
   * @param id
   * @param req
   */
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.systemCasesService.remove(id, req);
  }
}
