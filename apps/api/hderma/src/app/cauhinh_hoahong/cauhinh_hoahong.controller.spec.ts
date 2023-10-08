import { Test, TestingModule } from '@nestjs/testing';
import { CauhinhHoahongController } from './cauhinh_hoahong.controller';
import { CauhinhHoahongService } from './cauhinh_hoahong.service';

describe('CauhinhHoahongController', () => {
  let controller: CauhinhHoahongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CauhinhHoahongController],
      providers: [CauhinhHoahongService],
    }).compile();

    controller = module.get<CauhinhHoahongController>(CauhinhHoahongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
