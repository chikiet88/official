import { Test, TestingModule } from '@nestjs/testing';
import { PageDetailController } from './page_detail.controller';
import { PageDetailService } from './page_detail.service';

describe('PageDetailController', () => {
  let controller: PageDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageDetailController],
      providers: [PageDetailService],
    }).compile();

    controller = module.get<PageDetailController>(PageDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
