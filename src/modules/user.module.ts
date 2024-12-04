import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../domain/entities/user.entity';
import { CreateUserHandler } from '../application/commands/handlers/create-user.handler';
import { GetUserHandler } from '../application/queries/handlers/get-user.handler';
import { TypeORMUserRepository } from 'src/infrastructure/persistence/typeorm-user.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
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
