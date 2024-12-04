import { Test, TestingModule } from '@nestjs/testing';
import { NewsManagerController } from './news-manager.controller';
import { NewsManagerService } from './news-manager.service';

describe('NewsManagerController', () => {
  let controller: NewsManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsManagerController],
      providers: [NewsManagerService],
    }).compile();

    controller = module.get<NewsManagerController>(NewsManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
