import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserFirebaseDto } from '../models/dtos/user-manager/creaate-user-firebase.dto';
import { CreateUserDto } from '../models/dtos/user-manager/create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { AccountStatus, UserRole } from '../shared/enum';
import { v4 as uuidv4 } from 'uuid';
import { LoggerService } from './log.service';
import { UpdateProfileDto } from '../models/dtos/user-manager/update-user.dto';
import { TokenService } from './token.service';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { firebaseApp } from '../shared/configs/firebase-authen';
import { EmailService } from './email.service';
import { firebaseAuth } from '../shared/configs/firebase-admin';
import { TemplateConstants } from '../shared/constants/email-template.constants';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logService: LoggerService,
    private readonly tokenService: TokenService,
    private readonly mailerService: EmailService,
  ) {}

  async findOne(id: string) {
    await this.userRepository.findById(id);
  }
  async delete(id: string) {
    await this.userRepository.delete(id);
  }

  async updateAvatar(id: string) {
    await this.userRepository.delete(id);
  }

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

      this.sendEmailVerification(newUser.uuid);

      return await this.userRepository.save(newUser);
    } catch (error) {
      this.logService.error(error?.message);
      throw new HttpException(`Create User with Error ${error?.message}`, 400);
    }
  }

  async create(request: CreateUserDto) {
    const firebaseAuth = getAuth(firebaseApp);
    const password = 'Password@1';
    const firebaseresponse = await createUserWithEmailAndPassword(
      firebaseAuth,
      request.email,
      password,
    );
    if (firebaseresponse) {
      const firebaseUser: CreateUserFirebaseDto = {
        apiKey: firebaseresponse.user.displayName,
        email: firebaseresponse.user.email,
        displayName: request.fullname,
        uid: firebaseresponse.user.uid,
      };
      const newUser = await this.createFirebaseUser(firebaseUser);
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
        role: request.role,
        accountStatus: AccountStatus.ACTIVE,
        facebookProfile: request.facebookProfile,
        fullname: request.fullname,
        gender: request.gender,
        linkedinProfile: request.linkedinProfile,
        twitterProfile: request.twitterProfile,
        occupation: request.occupation,
        company: request.company,
      };

      this.sendWelcomeEmail(request.email, request.fullname, password);

      return await this.userRepository.update(user);
    } else {
      throw new HttpException(`Create User with Error`, 400);
    }
  }

  async updateProfile(request: UpdateProfileDto) {
    try {
      let newUser = null;
      if (request.email != null || request.email != '') {
        newUser = await this.userRepository.findByEmail(request.email);
      } else {
        const tokenData = await this.tokenService.getToken();
        if (!tokenData) {
          throw new UnauthorizedException();
        }
        newUser = await this.userRepository.findByEmail(tokenData.email);
      }

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
          role: request.role ?? newUser.role,
          accountStatus: request.accountStatus ?? newUser.accountStatus,
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

  async findAll(
    page: number,
    limit: number,
    sort: string,
    filter: string,
  ): Promise<{ data: User[]; total: number }> {
    const response = await this.userRepository.find(page, limit, sort, filter);
    const tokenData = await this.tokenService.getToken();
    if (!tokenData) {
      throw new UnauthorizedException();
    }
    response.data = response.data.filter((x) => x.email != tokenData.email);
    return response;
  }

  async sendEmailVerification(uid: string) {
    const user = await firebaseAuth.getUser(uid);

    if (!user.emailVerified) {
      const link = await firebaseAuth.generateEmailVerificationLink(user.email);
      const existingUser = await this.userRepository.findByEmail(user.email);

      const mail = {
        to: existingUser.email,
        subject: 'Verify your email for Duke team',
        templateName: TemplateConstants.VerifyAccountTemplate,
        dynamicData: {
          name: existingUser.fullname,
          confirmationLink: link,
          expirationTime: 60,
        },
      };
      this.mailerService.send(mail);
    }
  }

  async sendWelcomeEmail(email: string, fullname: string, password: string) {
    const mail = {
      to: email,
      subject: 'Welcome to MyApp!',
      templateName: TemplateConstants.SendPasswordTemplate,
      dynamicData: {
        name: fullname,
        welcomeLink: 'https://jup-admin.vercel.app',
        password: password,
      },
    };
    this.mailerService.send(mail);
  }
}
