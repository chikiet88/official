import { Test, TestingModule } from '@nestjs/testing';
import { BaivietService } from './baiviet.service';

describe('BaivietService', () => {
  let service: BaivietService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaivietService],
    }).compile();

    service = module.get<BaivietService>(BaivietService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
