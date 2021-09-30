import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { EanService } from './ean.service';

@Controller('ean')
export class EanController {
  constructor(private readonly eanService: EanService) {}

  @Get()
  findAll() {
    return this.eanService.findAll();
  }

  @Get(':eanCode')
  findOne(@Param('eanCode') eanCode: string) {
    return this.eanService.findOne(eanCode);
  }

  @Put()
  async update(@Req() req, @Res() res) {
    const response = await this.eanService.update(req);
    return res.status(HttpStatus.OK).json(response);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eanService.remove(id);
  }
}
