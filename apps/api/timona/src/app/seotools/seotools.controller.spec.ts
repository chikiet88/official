import { Test, TestingModule } from '@nestjs/testing';
import { SeotoolsController } from './seotools.controller';
import { SeotoolsService } from './seotools.service';

describe('SeotoolsController', () => {
  let controller: SeotoolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeotoolsController],
      providers: [SeotoolsService],
    }).compile();

    controller = module.get<SeotoolsController>(SeotoolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
