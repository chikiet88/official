import { Test, TestingModule } from '@nestjs/testing';
import { DanhmucProductController } from './danhmuc-product.controller';
import { DanhmucProductService } from './danhmuc-product.service';

describe('DanhmucProductController', () => {
  let controller: DanhmucProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DanhmucProductController],
      providers: [DanhmucProductService],
    }).compile();

    controller = module.get<DanhmucProductController>(DanhmucProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
