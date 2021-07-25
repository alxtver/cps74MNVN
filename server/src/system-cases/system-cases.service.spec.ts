import { Test, TestingModule } from '@nestjs/testing';
import { SystemCasesService } from './system-cases.service';

describe('SystemCasesService', () => {
  let service: SystemCasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemCasesService],
    }).compile();

    service = module.get<SystemCasesService>(SystemCasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
