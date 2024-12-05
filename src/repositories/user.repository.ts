import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
}
