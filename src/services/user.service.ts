import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserFirebaseDto } from 'src/models/dtos/user-manager/creaate-user-firebase.dto';
import { CreateUserDto } from 'src/models/dtos/user-manager/create-user.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { AccountStatus, UserRole } from 'src/shared/enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createFirebaseUser(createUserDto: CreateUserFirebaseDto) {
    const newUser: User = {
      email: createUserDto.email,
      accountStatus: AccountStatus.ACTIVE,
      fullname: createUserDto.displayName,
      role: UserRole.STUDENT,
      createdAt: new Date(),
      updatedAt: new Date(),
      uuid: createUserDto.uid,
      id: uuidv4(),
      isActive: true,
    };
    return await this.userRepository.save(newUser);
  }

  async create(request: CreateUserDto) {
    const newUser = await this.createFirebaseUser(request.firebaseUser);
    return await this.userRepository.save({ ...newUser }); // them code o doan nay
  }
}
