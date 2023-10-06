import { Test, TestingModule } from '@nestjs/testing';
import { CustomerChiendichService } from './customer_chiendich.service';

describe('CustomerChiendichService', () => {
  let service: CustomerChiendichService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerChiendichService],
    }).compile();

    service = module.get<CustomerChiendichService>(CustomerChiendichService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
