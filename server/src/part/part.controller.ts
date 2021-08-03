import { Controller, Get, Res, HttpStatus, Put, Req } from '@nestjs/common';
import { PartService } from './part.service';

@Controller('parts')
export class PartController {
  constructor(private partService: PartService) {}

  /**
   * Получить все темы
   * @param res
   */
  @Get('')
  async getAllPki(@Res() res) {
    const parts = await this.partService.getAllParts();
    return res.status(HttpStatus.OK).json(parts);
  }

  /**
   * Изменить тему
   * @param req
   * @param res
   */
  @Put('')
  async changePart(@Req() req, @Res() res) {
    const part = await this.partService.changePart(req);
    return res.status(HttpStatus.OK).json(part);
  }
}
