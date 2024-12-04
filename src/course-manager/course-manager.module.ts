import { Module } from '@nestjs/common';
import { CourseManagerService } from './course-manager.service';
import { CourseManagerController } from './course-manager.controller';

@Module({
  controllers: [CourseManagerController],
  providers: [CourseManagerService],
})
export class CourseManagerModule {}
