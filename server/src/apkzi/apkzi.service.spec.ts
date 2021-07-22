import { Test, TestingModule } from '@nestjs/testing';
import { ApkziService } from './apkzi.service';

describe('ApkziService', () => {
  let service: ApkziService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApkziService],
    }).compile();

    service = module.get<ApkziService>(ApkziService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
