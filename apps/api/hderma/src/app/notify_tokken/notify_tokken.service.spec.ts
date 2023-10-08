import { Test, TestingModule } from '@nestjs/testing';
import { NotifyTokkenService } from './notify_tokken.service';

describe('NotifyTokkenService', () => {
  let service: NotifyTokkenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifyTokkenService],
    }).compile();

    service = module.get<NotifyTokkenService>(NotifyTokkenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
