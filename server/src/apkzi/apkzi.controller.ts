import {Controller, Get, Post, Body, Put, Param, Delete, Req, Res, HttpStatus} from '@nestjs/common';
import { ApkziService } from './apkzi.service';
import {ApkziDto} from "../dto/apkzi.dto";

@Controller('apkzi')
export class ApkziController {
  constructor(private readonly apkziService: ApkziService) {}

  /**
   * Добавить АПКЗИ
   * @param res
   * @param req
   * @param ApkziDto
   */
  @Post('')
  async addApkzi(@Res() res, @Req() req, @Body() ApkziDto: ApkziDto) {
    const response = await this.apkziService.addApkzi(ApkziDto, req);
    return res.status(HttpStatus.OK).json(response);
  }

  @Get()
  async getAllApkzi(@Req() req, @Res() res) {
    const apkzis = await this.apkziService.getAllApkzi(req);
    return res.status(HttpStatus.OK).json(apkzis)
  }

  /**
   * Получить последний введенный АПКЗИ
   * @param req
   * @param res
   */
  @Get('lastApkzi')
  async getLastApkzi(@Req() req, @Res() res) {
    const lastApkzi = await this.apkziService.getLastApkzi(req);
    return res.status(HttpStatus.OK).json(lastApkzi)
  }

  /**
   * Редактировать АПКЗИ
   * @param req
   * @param res
   */
  @Put('')
  async editPki(@Req() req, @Res() res) {
    const response = await this.apkziService.editApkzi(req);
    return res.status(HttpStatus.OK).json(response);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apkziService.findOne(+id);
  }

  /**
   * Удалить АПКЗИ
   * @param req
   * @param res
   */
  @Delete('')
  async deletePki(@Req() req, @Res() res) {
    const response = await this.apkziService.deleteApkzi(req);
    return res.status(HttpStatus.OK).json(response);
  }
}
