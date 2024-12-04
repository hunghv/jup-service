// src/infrastructure/persistence/typeorm-user.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class TypeORMUserRepository extends UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super();
  }

  save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
