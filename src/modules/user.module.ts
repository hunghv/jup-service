import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../domain/entities/user.entity';
import { CreateUserHandler } from '../application/commands/handlers/create-user.handler';
import { GetUserHandler } from '../application/queries/handlers/get-user.handler';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserController } from './user.controller';
import { TypeORMUserRepository } from '../infrastructure/persistence';
import { Answer } from 'src/domain/entities/answer.entity';
import { Comment } from 'src/domain/entities/comment.entity';
import { Course } from 'src/domain/entities/course.entity';
import { Enrollment } from 'src/domain/entities/enrollment.entity';
import { Lesson } from 'src/domain/entities/lesson.entity';
import { Like } from 'src/domain/entities/like.entity';
import { News } from 'src/domain/entities/news.entity';
import { Payment } from 'src/domain/entities/payment.entity';
import { Question } from 'src/domain/entities/question.entity';
import { Review } from 'src/domain/entities/review.entity';

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
    // Infrastructure
    { provide: UserRepository, useClass: TypeORMUserRepository },

    // Command Handlers
    CreateUserHandler,

    // Query Handlers
    GetUserHandler,
  ],
  exports: [UserRepository],
  controllers: [UserController],
})
export class UserModule {}
