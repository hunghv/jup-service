import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserController } from '../controllers/user.controller';
import { Answer } from '../entities/answer.entity';
import { Comment } from '../entities/comment.entity';
import { Course } from '../entities/course.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { Lesson } from '../entities/lesson.entity';
import { Like } from '../entities/like.entity';
import { News } from '../entities/news.entity';
import { Payment } from '../entities/payment.entity';
import { Question } from '../entities/question.entity';
import { Review } from '../entities/review.entity';
import { TypeORMUserRepository } from '../repositories/typeorm-user.repository';
import { UserService } from '../services/user.service';
import { LogModule } from './log.module';
import { FirebaseAuthGuard } from '../utils/firebase-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        User,
        Answer,
        Comment,
        Course,
        Enrollment,
        Lesson,
        Like,
        News,
        Payment,
        Question,
        Review,
      ],
      'app_db',
    ),
    LogModule,
  ],
  providers: [
    { provide: UserRepository, useClass: TypeORMUserRepository },
    UserService,
    FirebaseAuthGuard,
  ],
  exports: [UserRepository, TypeOrmModule, FirebaseAuthGuard],
  controllers: [UserController],
})
export class UserModule {}
