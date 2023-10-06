import { Test, TestingModule } from '@nestjs/testing';
import { ApightkController } from './apightk.controller';
import { ApightkService } from './apightk.service';

describe('ApightkController', () => {
  let controller: ApightkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApightkController],
      providers: [ApightkService],
    }).compile();

    controller = module.get<ApightkController>(ApightkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
