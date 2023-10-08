import { Test, TestingModule } from '@nestjs/testing';
import { UploaddbController } from './uploaddb.controller';
import { UploaddbService } from './uploaddb.service';

describe('UploaddbController', () => {
  let controller: UploaddbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploaddbController],
      providers: [UploaddbService],
    }).compile();

    controller = module.get<UploaddbController>(UploaddbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
