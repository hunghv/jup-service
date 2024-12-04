import { Injectable } from '@nestjs/common';
import { CreateCourseManagerDto } from './dto/create-course-manager.dto';
import { UpdateCourseManagerDto } from './dto/update-course-manager.dto';

@Injectable()
export class CourseManagerService {
  create(createCourseManagerDto: CreateCourseManagerDto) {
    return 'This action adds a new courseManager';
  }

  findAll() {
    return `This action returns all courseManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseManager`;
  }

  update(id: number, updateCourseManagerDto: UpdateCourseManagerDto) {
    return `This action updates a #${id} courseManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseManager`;
  }
}
