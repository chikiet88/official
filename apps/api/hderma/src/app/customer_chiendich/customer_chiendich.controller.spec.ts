import { Test, TestingModule } from '@nestjs/testing';
import { CustomerChiendichController } from './customer_chiendich.controller';
import { CustomerChiendichService } from './customer_chiendich.service';

describe('CustomerChiendichController', () => {
  let controller: CustomerChiendichController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerChiendichController],
      providers: [CustomerChiendichService],
    }).compile();

    controller = module.get<CustomerChiendichController>(CustomerChiendichController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
