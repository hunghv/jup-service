import { Module } from '@nestjs/common';
import { UserManagerService } from './user-manager.service';
import { UserManagerController } from './user-manager.controller';

@Module({
  controllers: [UserManagerController],
  providers: [UserManagerService],
})
export class UserManagerModule {}
