import { Test, TestingModule } from '@nestjs/testing';
import { UploaddbService } from './uploaddb.service';

describe('UploaddbService', () => {
  let service: UploaddbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploaddbService],
    }).compile();

    service = module.get<UploaddbService>(UploaddbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
