import { Test, TestingModule } from '@nestjs/testing';
import { PageDetailService } from './page_detail.service';

describe('PageDetailService', () => {
  let service: PageDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageDetailService],
    }).compile();

    service = module.get<PageDetailService>(PageDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
