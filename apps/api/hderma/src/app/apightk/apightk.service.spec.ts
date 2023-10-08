import { Test, TestingModule } from '@nestjs/testing';
import { ApightkService } from './apightk.service';

describe('ApightkService', () => {
  let service: ApightkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApightkService],
    }).compile();

    service = module.get<ApightkService>(ApightkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
