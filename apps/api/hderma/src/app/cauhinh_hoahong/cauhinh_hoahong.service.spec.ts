import { Test, TestingModule } from '@nestjs/testing';
import { CauhinhHoahongService } from './cauhinh_hoahong.service';

describe('CauhinhHoahongService', () => {
  let service: CauhinhHoahongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CauhinhHoahongService],
    }).compile();

    service = module.get<CauhinhHoahongService>(CauhinhHoahongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
