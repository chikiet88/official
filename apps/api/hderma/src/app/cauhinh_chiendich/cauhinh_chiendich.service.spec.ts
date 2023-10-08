import { Test, TestingModule } from '@nestjs/testing';
import { CauhinhChiendichService } from './cauhinh_chiendich.service';

describe('CauhinhChiendichService', () => {
  let service: CauhinhChiendichService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CauhinhChiendichService],
    }).compile();

    service = module.get<CauhinhChiendichService>(CauhinhChiendichService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
