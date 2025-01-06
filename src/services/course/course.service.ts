// src/courses/courses.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, Lesson } from 'src/entities';
import { CreateCourseDto, UpdateCourseDto } from '../../models/dtos';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course, 'app_db')
    private coursesRepository: Repository<Course>,

    @InjectRepository(Lesson, 'app_db')
    private lessonsRepository: Repository<Lesson>,

    private cloudinaryService: CloudinaryService,
  ) {}

  async createCourse(
    createCourseDto: CreateCourseDto,
    file: Express.Multer.File,
  ): Promise<Course> {
    const course = this.coursesRepository.create(createCourseDto);
    const imageResponse = await this.cloudinaryService.uploadImage(
      file,
      'course_thumnail',
    );

    if (!imageResponse)
      throw new HttpException('Lưu thumnail images bị lỗi', 404);

    course.thumnailUrl = imageResponse.secure_url;

    await this.coursesRepository.save(course);

    return course;
  }

  async findCourseWithLessons(id: string): Promise<Course> {
    return this.coursesRepository.findOne({
      where: { id },
      relations: ['lessons'], // Lấy tất cả bài học liên quan
    });
  }

  async updateCourse(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      where: { id },
      relations: ['lessons'], // Lấy tất cả bài học liên quan
    });
    const lessons = updateCourseDto.lessons.map((lessonDto) => {
      const lesson = this.lessonsRepository.create({
        ...lessonDto,
        course: course,
      });
      return this.lessonsRepository.save(lesson);
    });

    course.lessons = await Promise.all(lessons);

    await this.coursesRepository.update(id, updateCourseDto);
    return this.coursesRepository.findOne({
      where: { id },
      relations: ['lessons'],
    });
  }

  async removeCourse(id: string): Promise<void> {
    await this.coursesRepository.delete(id);
  }

  async findAllCourses(
    page: number,
    limit: number,
  ): Promise<{ data: Course[]; total: number }> {
    const [data, total] = await this.coursesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }
}
