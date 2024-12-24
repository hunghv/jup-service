import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from '../controllers/chat.controller';
import { Message } from '../entities/chat.entity';
import { User } from '../entities/user.entity';
import { ChatGateway } from '../gateway/chat.gateway';
import { ChatService } from '../services/chat.service';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message], 'app_db'), UserModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [TypeOrmModule],
})
export class ChatModule {}
