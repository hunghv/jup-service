// src/courses/courses.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, Lesson } from 'src/entities';
import { CreateCourseDto, UpdateCourseDto } from '../../models/dtos';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course, 'app_db')
    private coursesRepository: Repository<Course>,

    @InjectRepository(Lesson, 'app_db')
    private lessonsRepository: Repository<Lesson>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create(createCourseDto);

    // Lưu khóa học trước khi thêm bài học
    await this.coursesRepository.save(course);

    // Tạo và gán bài học cho khóa học
    const lessons = createCourseDto.lessons.map((lessonDto) => {
      const lesson = this.lessonsRepository.create({
        ...lessonDto,
        course: course,
      });
      return this.lessonsRepository.save(lesson);
    });

    // Đảm bảo rằng khóa học và bài học đã được lưu thành công
    course.lessons = await Promise.all(lessons);

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
    await this.coursesRepository.update(id, updateCourseDto);
    return this.coursesRepository.findOne({
      where: { id },
      relations: ['lessons'], // Lấy tất cả bài học liên quan
    }); // Trả về khóa học đã được cập nhật
  }

  async removeCourse(id: string): Promise<void> {
    await this.coursesRepository.delete(id);
  }

  async findAllCourses(): Promise<Course[]> {
    return this.coursesRepository.find(); // Trả về tất cả các khóa học
  }
}
