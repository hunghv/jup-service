import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firebaseAuth } from '../shared/configs/firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { LoggerService } from './log.service';
import { UserRepository } from '../repositories/user.repository';
import { TokenDto } from '../models/requests/get-token.dto';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../shared/configs/firebase-authen';
import { EmailService } from './email.service';
import { TemplateConstants } from '../shared/constants/email-template.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logService: LoggerService,
    private readonly mailerService: EmailService,
  ) {}

  async verifyToken(idToken: string): Promise<DecodedIdToken> {
    try {
      return await firebaseAuth.verifyIdToken(idToken);
    } catch (error) {
      this.logService.error(error.message);
      throw new Error('Invalid token');
    }
  }

  async fetchToken(request: TokenDto) {
    try {
      const firebaseAuth = getAuth(firebaseApp);
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        request.email,
        request.password,
      );
      const idToken = await userCredential.user.getIdToken();
      return idToken;
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        throw new UnauthorizedException('User not found');
      }
      if (error.code === 'auth/wrong-password') {
        throw new UnauthorizedException('Incorrect password');
      }
      throw new UnauthorizedException('Authentication failed');
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
      templateName: TemplateConstants.ResetPasswordTemplate,
      dynamicData: {
        name: existingUser.fullname,
        resetLink: resetLink,
        expirationTime: 60,
      },
    };
    this.mailerService.send(mail);

    return resetLink;
  }
}
