import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from 'src/models/dtos';
import { CoursesService } from '../services';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.createCourse(createCourseDto);
  }

  @Get(':id')
  async findCourseWithLessons(@Param('id') id: string) {
    return this.coursesService.findCourseWithLessons(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.updateCourse(id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.coursesService.removeCourse(id);
  }

  @Get()
  async findAll() {
    return this.coursesService.findAllCourses();
  }
}
