import { Test, TestingModule } from '@nestjs/testing';
import { CombosanphamController } from './combosanpham.controller';
import { CombosanphamService } from './combosanpham.service';

describe('CombosanphamController', () => {
  let controller: CombosanphamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombosanphamController],
      providers: [CombosanphamService],
    }).compile();

    controller = module.get<CombosanphamController>(CombosanphamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
