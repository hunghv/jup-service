import { Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
import { firebaseAuth } from '../shared/configs/firebase-admin';
// import { ResponseModel } from '../models/reponse/response.model';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { LoggerService } from './log.service';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logService: LoggerService,
  ) {}

  async verifyToken(idToken: string): Promise<DecodedIdToken> {
    try {
      return await firebaseAuth.verifyIdToken(idToken);
    } catch (error) {
      this.logService.error(error.message);
      throw new Error('Invalid token');
    }
  }

  //   async create(createAuthDto: CreateAuthDto) {
  //     try {
  //       const existingUser = await this.userRepository.findOne({
  //         where: { email: createAuthDto.email },
  //       });

  //       if (existingUser) {
  //         throw new BadRequestException('Email đã được sử dụng.');
  //       }
  //       const user = await firebaseAuth.createUser({
  //         email: createAuthDto.email,
  //         password: createAuthDto.password,
  //         displayName: createAuthDto.fullname,
  //         emailVerified: false,
  //       });
  //       if (user) {
  //         const newUser = this.userRepository.create(createAuthDto);
  //         newUser.uuid = user.uid;
  //         const userEntity = this.userRepository.save(newUser);
  //         if (userEntity) {
  //           await this.sendEmailVerification(user.uid);
  //           return ResponseModel.success(user, 'Register Sucessully');
  //         }
  //         await firebaseAuth.deleteUser(user.uid);
  //       }
  //       return ResponseModel.error('failed', 'SignIn has error');
  //     } catch (error) {
  //       return ResponseModel.error(error, 'SignIn has error');
  //     }
  //   }

  async sendEmailVerification(uid: string) {
    const user = await firebaseAuth.getUser(uid);

    if (!user.emailVerified) {
      const link = await firebaseAuth.generateEmailVerificationLink(user.email);
      const existingUser = await this.userRepository.findByEmail(user.email);

      const mail = {
        to: existingUser.email,
        subject: 'Verify your email for L2404 team',
        templateId: 'd-6c700f7e9eed4bdb8c925513ded4642e',
        dynamicData: {
          RecipientName: existingUser.fullname,
          ConfirmUrl: link,
        },
      };
      //   this.mailerService.send(mail);
      console.log(mail);
    }
  }

  async findUserByMail(mail: string) {
    const existingUser = await this.userRepository.findByEmail(mail);
    return existingUser;
  }

  async sendPasswordReset(email: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    const resetLink = await firebaseAuth.generatePasswordResetLink(email);

    const mail = {
      to: existingUser.email,
      subject: 'Reset your password for Duke team',
      templateId: 'd-388cd3e77d7d4c11921c972b2638aa5a',
      dynamicData: {
        RecipientName: existingUser.fullname,
        ResetUrl: resetLink,
      },
    };
    console.log(mail);
    // this.mailerService.send(mail);

    return resetLink;
  }
}
