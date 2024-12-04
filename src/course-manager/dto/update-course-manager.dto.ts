import { PartialType } from '@nestjs/swagger';
import { CreateCourseManagerDto } from './create-course-manager.dto';

export class UpdateCourseManagerDto extends PartialType(
  CreateCourseManagerDto,
) {}
