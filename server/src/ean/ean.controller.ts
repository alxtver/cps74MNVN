import { Controller, Get, Param } from '@nestjs/common';
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

  // @Put(':id')
  // update(@Req() req, @Res() res) {
  //   return this.eanService.update(req);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.eanService.remove(+id);
  // }
}
