import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Part } from '../interfaces/part.interface';
import { User } from '../interfaces/user.interface';

@Injectable()
export class PartService {
  constructor(
    @InjectModel('Part')
    private readonly partModel: Model<Part>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  /**
   * Получить все темы
   */
  async getAllParts(): Promise<Part[]> {
    return this.partModel.find().sort({
      created: -1,
    });
  }

  /**
   * Изменить тему
   */
  async changePart(req): Promise<Part> {
    let part: any = await this.partModel.findOne({ part: req.body.part });
    // если нет темы, то создаем новую
    if (!part) {
      part = await new this.partModel({
        part: req.body.part,
        created: Date.now() + +3 * 60 * 60 * 1000,
      }).save();
    }
    const user = await this.userModel.findOne({
      username: req.session.user.username,
    });
    user.lastPart = req.body.part;
    await user.save();
    req.session.user = user;
    req.session.part = req.body.part;
    return part;
  }
}
