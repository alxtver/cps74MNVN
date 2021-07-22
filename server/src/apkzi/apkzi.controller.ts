import {Controller, Get, Post, Body, Put, Param, Delete, Req, Res, HttpStatus} from '@nestjs/common';
import { ApkziService } from './apkzi.service';
import { CreateApkziDto } from './dto/create-apkzi.dto';

@Controller('apkzi')
export class ApkziController {
  constructor(private readonly apkziService: ApkziService) {}

  @Post()
  create(@Body() createApkziDto: CreateApkziDto) {
    return this.apkziService.create(createApkziDto);
  }

  @Get()
  async getAllApkzi(@Req() req, @Res() res) {
    const apkzis = await this.apkziService.getAllApkzi(req);
    return res.status(HttpStatus.OK).json(apkzis)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apkziService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apkziService.remove(+id);
  }
}
