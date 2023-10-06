import { Test, TestingModule } from '@nestjs/testing';
import { ThongtinchungService } from './thongtinchung.service';

describe('ThongtinchungService', () => {
  let service: ThongtinchungService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThongtinchungService],
    }).compile();

    service = module.get<ThongtinchungService>(ThongtinchungService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
