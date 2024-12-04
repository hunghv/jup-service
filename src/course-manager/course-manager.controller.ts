import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseManagerService } from './course-manager.service';
import { CreateCourseManagerDto } from './dto/create-course-manager.dto';
import { UpdateCourseManagerDto } from './dto/update-course-manager.dto';

@Controller('course-manager')
export class CourseManagerController {
  constructor(private readonly courseManagerService: CourseManagerService) {}

  @Post()
  create(@Body() createCourseManagerDto: CreateCourseManagerDto) {
    return this.courseManagerService.create(createCourseManagerDto);
  }

  @Get()
  findAll() {
    return this.courseManagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseManagerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseManagerDto: UpdateCourseManagerDto,
  ) {
    return this.courseManagerService.update(+id, updateCourseManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseManagerService.remove(+id);
  }
}
