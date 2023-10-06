import { Test, TestingModule } from '@nestjs/testing';
import { CustomerDiemService } from './customer_diem.service';

describe('CustomerDiemService', () => {
  let service: CustomerDiemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerDiemService],
    }).compile();

    service = module.get<CustomerDiemService>(CustomerDiemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
