import { Test, TestingModule } from '@nestjs/testing';
import { NotifyTokkenController } from './notify_tokken.controller';
import { NotifyTokkenService } from './notify_tokken.service';

describe('NotifyTokkenController', () => {
  let controller: NotifyTokkenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotifyTokkenController],
      providers: [NotifyTokkenService],
    }).compile();

    controller = module.get<NotifyTokkenController>(NotifyTokkenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
