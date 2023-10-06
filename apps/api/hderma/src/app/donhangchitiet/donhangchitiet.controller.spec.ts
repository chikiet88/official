import { Test, TestingModule } from '@nestjs/testing';
import { DonhangchitietController } from './donhangchitiet.controller';
import { DonhangchitietService } from './donhangchitiet.service';

describe('DonhangchitietController', () => {
  let controller: DonhangchitietController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonhangchitietController],
      providers: [DonhangchitietService],
    }).compile();

    controller = module.get<DonhangchitietController>(DonhangchitietController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
