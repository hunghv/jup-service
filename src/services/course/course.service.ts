// src/courses/courses.service.ts
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, Lesson } from '../../entities';
import { CreateCourseDto, UpdateCourseDto } from '../../models/dtos';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary.service';
import { TokenService } from '../token.service';
import { UserRepository } from '../../repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course, 'app_db')
    private coursesRepository: Repository<Course>,

    @InjectRepository(Lesson, 'app_db')
    private lessonsRepository: Repository<Lesson>,

    private cloudinaryService: CloudinaryService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  async createCourse(
    createCourseDto: CreateCourseDto,
    file: Express.Multer.File,
  ): Promise<Course> {
    const imageResponse = await this.cloudinaryService.uploadImage(
      file,
      'course_thumnail',
    );

    if (!imageResponse)
      throw new HttpException('Lưu thumnail images bị lỗi', 404);

    const tokenData = await this.tokenService.getToken();
    if (!tokenData) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findByEmail(tokenData.email);

    const course: Course = {
      instructor: user,
      title: createCourseDto.title,
      id: uuidv4(),
      description: createCourseDto.description,
      isActive: createCourseDto.isActive,
      isSale: createCourseDto.isSale,
      saleRate: createCourseDto.saleRate,
      duration: createCourseDto.duration,
      price: createCourseDto.price,
      createdAt: new Date(),
      thumnailUrl: imageResponse.secure_url ?? '',
    };

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
    const [courseList, total] = await this.coursesRepository.findAndCount({
      where: { isActive: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    const data: Course[] = courseList.map((x) => {
      return {
        ...x,
        originalPrice: x.price,
        price: x.isSale ? x.price * (x.saleRate / 100) : x.price * 1,
      };
    });

    return { data, total };
  }
}
