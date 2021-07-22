import { Test, TestingModule } from '@nestjs/testing';
import { EanController } from './ean.controller';
import { EanService } from './ean.service';

describe('EanController', () => {
  let controller: EanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EanController],
      providers: [EanService],
    }).compile();

    controller = module.get<EanController>(EanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
