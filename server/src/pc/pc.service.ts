import { Injectable } from '@nestjs/common';
import { CreatePcDto } from './dto/create-pc.dto';

@Injectable()
export class PcService {
  create(createPcDto: CreatePcDto) {
    return 'This action adds a new pc';
  }

  findAll() {
    return `This action returns all pc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pc`;
  }

  update(id: number) {
    return `This action updates a #${id} pc`;
  }

  remove(id: number) {
    return `This action removes a #${id} pc`;
  }
}
