import { Test, TestingModule } from '@nestjs/testing';
import { SystemCasesController } from './system-cases.controller';
import { SystemCasesService } from './system-cases.service';

describe('SystemCasesController', () => {
  let controller: SystemCasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemCasesController],
      providers: [SystemCasesService],
    }).compile();

    controller = module.get<SystemCasesController>(SystemCasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
