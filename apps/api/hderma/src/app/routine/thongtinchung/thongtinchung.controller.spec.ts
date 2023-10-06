import { Test, TestingModule } from '@nestjs/testing';
import { ThongtinchungController } from './thongtinchung.controller';
import { ThongtinchungService } from './thongtinchung.service';

describe('ThongtinchungController', () => {
  let controller: ThongtinchungController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThongtinchungController],
      providers: [ThongtinchungService],
    }).compile();

    controller = module.get<ThongtinchungController>(ThongtinchungController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
