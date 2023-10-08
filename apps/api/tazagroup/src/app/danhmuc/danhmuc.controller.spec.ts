import { Test, TestingModule } from '@nestjs/testing';
import { DanhmucController } from './danhmuc.controller';
import { DanhmucService } from './danhmuc.service';

describe('DanhmucController', () => {
  let controller: DanhmucController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DanhmucController],
      providers: [DanhmucService],
    }).compile();

    controller = module.get<DanhmucController>(DanhmucController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
