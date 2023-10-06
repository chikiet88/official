import { Test, TestingModule } from '@nestjs/testing';
import { ApinhanhService } from './apinhanh.service';

describe('ApinhanhService', () => {
  let service: ApinhanhService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApinhanhService],
    }).compile();

    service = module.get<ApinhanhService>(ApinhanhService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
