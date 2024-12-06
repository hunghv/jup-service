import { HttpException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserFirebaseDto } from '../models/dtos/user-manager/creaate-user-firebase.dto';
import { CreateUserDto } from '../models/dtos/user-manager/create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { AccountStatus, UserRole } from '../shared/enum';
import { v4 as uuidv4 } from 'uuid';
import { LoggerService } from './log.service';
import { UpdateProfileDto } from '../models/dtos/user-manager/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logService: LoggerService,
  ) {}

  async createFirebaseUser(createUserDto: CreateUserFirebaseDto) {
    try {
      const newUser: User = {
        email: createUserDto.email,
        accountStatus: AccountStatus.ACTIVE,
        fullname: createUserDto.displayName,
        role: UserRole.STUDENT,
        createdAt: new Date(),
        updatedAt: new Date(),
        uuid: createUserDto.uid,
        id: uuidv4(),
      };
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.logService.error(error?.message);
      throw new HttpException(`Create User with Error ${error?.message}`, 400);
    }
  }

  async create(request: CreateUserDto) {
    const newUser = await this.createFirebaseUser(request.firebaseUser);
    if (newUser) {
      const user: User = {
        ...newUser,
        phone: request.phone,
        address1: request.address1,
        address2: request.address2,
        dateOfBirth: request.dateOfBirth,
        updatedAt: new Date(),
        bio: request.bio,
        profilePictureUrl: request.profilePictureUrl,
        country: request.country,
        city: request.city,
        state: request.state,
        zipCode: request.zipCode,
        createdAt: new Date(),
        role: UserRole.STUDENT,
        accountStatus: AccountStatus.ACTIVE,
        facebookProfile: request.facebookProfile,
        fullname: request.fullname,
        gender: request.gender,
        linkedinProfile: request.linkedinProfile,
        twitterProfile: request.twitterProfile,
        occupation: request.occupation,
        company: request.company,
      };
      return await this.userRepository.update(user);
    } else {
      throw new HttpException(`Create User with Error`, 400);
    }
  }

  async updateProfile(request: UpdateProfileDto, email: string) {
    try {
      const newUser = await this.userRepository.findByEmail(email);
      if (newUser) {
        const user: User = {
          ...newUser,
          phone: request.phone,
          address1: request.address1,
          address2: request.address2,
          dateOfBirth: request.dateOfBirth,
          updatedAt: new Date(),
          bio: request.bio,
          profilePictureUrl: request.profilePictureUrl,
          country: request.country,
          city: request.city,
          state: request.state,
          zipCode: request.zipCode,
          createdAt: new Date(),
          role: UserRole.STUDENT,
          accountStatus: AccountStatus.ACTIVE,
          facebookProfile: request.facebookProfile,
          fullname: request.fullname,
          gender: request.gender,
          linkedinProfile: request.linkedinProfile,
          twitterProfile: request.twitterProfile,
          occupation: request.occupation,
          company: request.company,
        };
        return await this.userRepository.update(user);
      } else {
        throw new HttpException(`Create User with Error`, 400);
      }
    } catch (error) {
      this.logService.error(error.message);
      throw new HttpException(
        `Update User Profile with Error ${error?.message}`,
        400,
      );
    }
  }
}
