import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PcService } from './pc.service';
import { CreatePcDto } from './dto/create-pc.dto';

@Controller('pc')
export class PcController {
  constructor(private readonly pcService: PcService) {}

  @Post()
  create(@Body() createPcDto: CreatePcDto) {
    return this.pcService.create(createPcDto);
  }

  @Get()
  findAll() {
    return this.pcService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pcService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.pcService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pcService.remove(+id);
  }
}
