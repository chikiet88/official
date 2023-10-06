import { Test, TestingModule } from '@nestjs/testing';
import { CombosanphamService } from './combosanpham.service';

describe('CombosanphamService', () => {
  let service: CombosanphamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombosanphamService],
    }).compile();

    service = module.get<CombosanphamService>(CombosanphamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
