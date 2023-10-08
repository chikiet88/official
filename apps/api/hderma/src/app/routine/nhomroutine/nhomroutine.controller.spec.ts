import { Test, TestingModule } from '@nestjs/testing';
import { BaivietController } from './baiviet.controller';
import { BaivietService } from './baiviet.service';

describe('BaivietController', () => {
  let controller: BaivietController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaivietController],
      providers: [BaivietService],
    }).compile();

    controller = module.get<BaivietController>(BaivietController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
