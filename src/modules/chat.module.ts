import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from 'src/controllers/chat.controller';
import { Message } from 'src/entities/chat.entity';
import { User } from 'src/entities/user.entity';
import { ChatGateway } from 'src/gateway/chat.gateway';
import { ChatService } from 'src/services/chat.service';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message], 'app_db'), UserModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [TypeOrmModule],
})
export class ChatModule {}
