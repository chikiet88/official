import { Test, TestingModule } from '@nestjs/testing';
import { GiangvienController } from './giangvien.controller';
import { GiangvienService } from './giangvien.service';

describe('GiangvienController', () => {
  let controller: GiangvienController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiangvienController],
      providers: [GiangvienService],
    }).compile();

    controller = module.get<GiangvienController>(GiangvienController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
