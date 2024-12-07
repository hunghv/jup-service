import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from '../services/authen.service';
import { AuthController } from '../controllers/auth.controller';
import { UserModule } from './user.module';
import { LogModule } from './log.module';

@Module({
  imports: [forwardRef(() => UserModule), LogModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
