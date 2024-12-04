// src/modules/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../domain/entities/user.entity';
import { CreateUserHandler } from '../application/commands/handlers/create-user.handler';
import { GetUserHandler } from '../application/queries/handlers/get-user.handler';
import { TypeORMUserRepository } from 'src/infrastructure/typeorm-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [
    // Infrastructure
    { provide: 'UserRepository', useClass: TypeORMUserRepository },

    // Command Handlers
    CreateUserHandler,

    // Query Handlers
    GetUserHandler,
  ],
})
export class UserModule {}
