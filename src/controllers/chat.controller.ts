import { Controller, Get, Post, Body, Query, Version } from '@nestjs/common';
import { ChatService } from '../services/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  @Version('1')
  getMessages(
    @Query('senderId') senderId: string,
    @Query('receiverId') receiverId: string,
  ) {
    return this.chatService.getMessages(senderId, receiverId);
  }

  @Post('send')
  @Version('1')
  sendMessage(
    @Body('senderId') senderId: string,
    @Body('receiverId') receiverId: string,
    @Body('messageText') messageText: string,
  ) {
    return this.chatService.sendMessage(senderId, receiverId, messageText);
  }

  @Get('users')
  @Version('1')
  getUsers() {
    return this.chatService.getUsers();
  }
}
