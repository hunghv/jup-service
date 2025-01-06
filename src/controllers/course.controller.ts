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
import { CreateCourseDto, UpdateCourseDto } from '../models/dtos';
import { CoursesService } from '../services';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Version('1')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() data?: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let jsonString = '';
    if (typeof data !== 'string') {
      jsonString = JSON.stringify(data);
    }
    const objData = JSON.parse(jsonString);
    return await this.coursesService.createCourse(
      objData?.data as CreateCourseDto,
      file,
    );
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
