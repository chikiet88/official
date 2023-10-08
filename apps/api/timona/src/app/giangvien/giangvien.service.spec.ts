import { Test, TestingModule } from '@nestjs/testing';
import { GiangvienService } from './giangvien.service';

describe('GiangvienService', () => {
  let service: GiangvienService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GiangvienService],
    }).compile();

    service = module.get<GiangvienService>(GiangvienService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
