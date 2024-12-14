import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from '../services/authen.service';
import { AuthController } from '../controllers/auth.controller';
import { UserModule } from './user.module';
import { SharedModule } from './share.module';

@Module({
  imports: [forwardRef(() => UserModule), SharedModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
