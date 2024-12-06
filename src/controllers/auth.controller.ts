import {
  Controller,
  Post,
  Body,
  Version,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../services/authen.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('reset-pasword')
  @Version('1')
  ResetPassword(@Body('email') email: string) {
    return this.authService.sendPasswordReset(email);
  }

  @Post('login')
  async login(@Body('token') token: string) {
    try {
      const decodedToken = await this.authService.verifyToken(token);
      const logedInUser = await this.authService.findUserByMail(
        decodedToken.email,
      );

      return {
        uid: decodedToken.uid,
        email: decodedToken.email,
        data: logedInUser,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}