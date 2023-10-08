import { Test, TestingModule } from '@nestjs/testing';
import { SeotoolsService } from './seotools.service';

describe('SeotoolsService', () => {
  let service: SeotoolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeotoolsService],
    }).compile();

    service = module.get<SeotoolsService>(SeotoolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
