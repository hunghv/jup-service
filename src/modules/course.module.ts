import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CoursesController,
  QAController,
  EnrollmentsController,
  ReviewController,
  PaymentsController,
} from '../controllers';
import {
  User,
  Course,
  Enrollment,
  Lesson,
  Review,
  Answer,
  Question,
  Payment,
  Comment,
} from '../entities';
import {
  CoursesService,
  QAService,
  EnrollmentsService,
  ReviewService,
  PaymentsService,
} from '../services';
import { Like } from 'typeorm';
import { CloudinaryModule } from './cloudinary.module';
import { SharedModule } from './share.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        User,
        Like,
        Comment,
        Course,
        Enrollment,
        Lesson,
        Review,
        Answer,
        Question,
        Payment,
      ],
      'app_db',
    ),
    CloudinaryModule,
    SharedModule,
    UserModule,
  ],
  controllers: [
    CoursesController,
    QAController,
    EnrollmentsController,
    ReviewController,
    PaymentsController,
  ],
  providers: [
    CoursesService,
    QAService,
    EnrollmentsService,
    ReviewService,
    PaymentsService,
  ],
})
export class CourseModule {}
