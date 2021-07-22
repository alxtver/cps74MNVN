import { Test, TestingModule } from '@nestjs/testing';
import { ApkziController } from './apkzi.controller';
import { ApkziService } from './apkzi.service';

describe('ApkziController', () => {
  let controller: ApkziController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApkziController],
      providers: [ApkziService],
    }).compile();

    controller = module.get<ApkziController>(ApkziController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
