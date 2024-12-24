import {
  Controller,
  Post,
  Body,
  Version,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../services/authen.service';
import { Public } from '../utils/roles.decorator';
import { TokenDto } from '../models/requests/get-token.dto';
import { ResponseModel } from '../models/reponse/response.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('reset-pasword')
  @Version('1')
  @Public()
  ResetPassword(@Body('email') email: string) {
    return this.authService.sendPasswordReset(email);
  }

  @Post('login')
  @Version('1')
  @Public()
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

  @Post('fetchToken')
  @Version('1')
  @Public()
  async GetToken(@Body() request: TokenDto) {
    return ResponseModel.success(
      await this.authService.fetchToken(request),
      'Fetch Token Sucessully',
    );
  }
}
