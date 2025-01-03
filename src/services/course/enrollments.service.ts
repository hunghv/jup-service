import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment, User, Course } from '../../entities';
import { CreateEnrollmentDto } from '../../models/dtos';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment, 'app_db')
    private enrollmentsRepository: Repository<Enrollment>,

    @InjectRepository(User, 'app_db')
    private usersRepository: Repository<User>,

    @InjectRepository(Course, 'app_db')
    private coursesRepository: Repository<Course>,
  ) {}

  async enrollInCourse(
    createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<Enrollment> {
    const user = await this.usersRepository.findOne({
      where: { id: createEnrollmentDto.userId },
    });
    const course = await this.coursesRepository.findOne({
      where: { id: createEnrollmentDto.courseId },
    });

    if (!user || !course) {
      throw new Error('User or Course not found');
    }

    // Create and save the Enrollment
    const enrollment = this.enrollmentsRepository.create({
      user, // Assign the found user object
      course, // Assign the found course object
    });
    return this.enrollmentsRepository.save(enrollment);
  }
}
