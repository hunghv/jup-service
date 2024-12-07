import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/services/authen.service';
import { firebaseAuth } from 'src/shared/configs/firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decodedToken = await firebaseAuth.verifyIdToken(token);
      request.user = decodedToken;

      const systemUser = await this.authService.findUserByMail(
        request.user.email,
      );

      if (!systemUser) {
        throw new UnauthorizedException('Invalid token');
      }

      return roles.includes(systemUser.role);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
