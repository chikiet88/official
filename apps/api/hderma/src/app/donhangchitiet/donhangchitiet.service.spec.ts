import { Test, TestingModule } from '@nestjs/testing';
import { DonhangchitietService } from './donhangchitiet.service';

describe('DonhangchitietService', () => {
  let service: DonhangchitietService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonhangchitietService],
    }).compile();

    service = module.get<DonhangchitietService>(DonhangchitietService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
