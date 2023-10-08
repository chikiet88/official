import { Test, TestingModule } from '@nestjs/testing';
import { CauhinhChiendichController } from './cauhinh_chiendich.controller';
import { CauhinhChiendichService } from './cauhinh_chiendich.service';

describe('CauhinhChiendichController', () => {
  let controller: CauhinhChiendichController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CauhinhChiendichController],
      providers: [CauhinhChiendichService],
    }).compile();

    controller = module.get<CauhinhChiendichController>(CauhinhChiendichController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
