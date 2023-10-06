import { Test, TestingModule } from '@nestjs/testing';
import { ApinhanhController } from './apinhanh.controller';
import { ApinhanhService } from './apinhanh.service';

describe('ApinhanhController', () => {
  let controller: ApinhanhController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApinhanhController],
      providers: [ApinhanhService],
    }).compile();

    controller = module.get<ApinhanhController>(ApinhanhController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
