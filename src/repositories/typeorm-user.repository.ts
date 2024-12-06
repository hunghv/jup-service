import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class TypeORMUserRepository extends UserRepository {
  constructor(
    @InjectRepository(User, 'app_db')
    private readonly repository: Repository<User>,
  ) {
    super();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async update(user: User): Promise<User> {
    try {
      await this.repository.update(user.id, user);
      return this.findById(user.id);
    } catch (error) {
      console.log(error);
    }
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

  delete(id: string): Promise<void> {
    return this.repository.delete(id).then(() => undefined);
  }

  async find(
    page: number,
    limit: number,
    sort: string,
    filter: string,
  ): Promise<{ data: User[]; total: number }> {
    const [data, total] = await this.repository.findAndCount({
      where: filter ? JSON.parse(filter) : undefined, // JSON filter
      order: sort ? JSON.parse(sort) : { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }
}
