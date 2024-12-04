import { Test, TestingModule } from '@nestjs/testing';
import { CourseManagerController } from './course-manager.controller';
import { CourseManagerService } from './course-manager.service';

describe('CourseManagerController', () => {
  let controller: CourseManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseManagerController],
      providers: [CourseManagerService],
    }).compile();

    controller = module.get<CourseManagerController>(CourseManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
