import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class TypeORMUserRepository extends UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super();
  }

  save(user: User): Promise<User> {
    try {
      return this.repository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
