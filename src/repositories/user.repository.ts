import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract update(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract delete(id: string): Promise<void>;
  abstract find(
    page: number,
    limit: number,
    sort: string,
    filter: string,
  ): Promise<{ data: User[]; total: number }>;
}
