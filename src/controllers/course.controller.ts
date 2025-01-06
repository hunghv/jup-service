import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
  Version,
  Query,
} from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from 'src/models/dtos';
import { CoursesService } from '../services';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Version('1')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() data: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.coursesService.createCourse(data, file);
  }

  @Get(':id')
  @Version('1')
  async findCourseWithLessons(@Param('id') id: string) {
    return this.coursesService.findCourseWithLessons(id);
  }

  @Patch(':id')
  @Version('1')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.updateCourse(id, updateCourseDto);
  }

  @Delete(':id')
  @Version('1')
  async remove(@Param('id') id: string) {
    return this.coursesService.removeCourse(id);
  }

  @Get()
  @Version('1')
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.coursesService.findAllCourses(page, limit);
  }
}
