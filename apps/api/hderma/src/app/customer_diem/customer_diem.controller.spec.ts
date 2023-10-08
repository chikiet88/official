import { Test, TestingModule } from '@nestjs/testing';
import { CustomerDiemController } from './customer_diem.controller';
import { CustomerDiemService } from './customer_diem.service';

describe('CustomerDiemController', () => {
  let controller: CustomerDiemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerDiemController],
      providers: [CustomerDiemService],
    }).compile();

    controller = module.get<CustomerDiemController>(CustomerDiemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
