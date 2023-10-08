import { Test, TestingModule } from '@nestjs/testing';
import { DanhmucProductService } from './danhmuc-product.service';

describe('DanhmucProductService', () => {
  let service: DanhmucProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DanhmucProductService],
    }).compile();

    service = module.get<DanhmucProductService>(DanhmucProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
