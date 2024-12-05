import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { UserController } from '../controllers/user.controller';
import { Answer } from 'src/entities/answer.entity';
import { Comment } from 'src/entities/comment.entity';
import { Course } from 'src/entities/course.entity';
import { Enrollment } from 'src/entities/enrollment.entity';
import { Lesson } from 'src/entities/lesson.entity';
import { Like } from 'src/entities/like.entity';
import { News } from 'src/entities/news.entity';
import { Payment } from 'src/entities/payment.entity';
import { Question } from 'src/entities/question.entity';
import { Review } from 'src/entities/review.entity';
import { TypeORMUserRepository } from 'src/repositories/typeorm-user.repository';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
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
    ]),
    CqrsModule,
  ],
  providers: [
    { provide: UserRepository, useClass: TypeORMUserRepository },
    UserService,
  ],
  exports: [UserRepository],
  controllers: [UserController],
})
export class UserModule {}
