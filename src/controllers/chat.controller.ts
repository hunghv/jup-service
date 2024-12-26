import { Controller, Get, Post, Body, Query, Version } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { ResponseModel } from 'src/models/reponse/response.model';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  @Version('1')
  async getMessages(
    @Query('senderId') senderId: string,
    @Query('receiverId') receiverId: string,
  ) {
    const response = await this.chatService.getMessages(senderId, receiverId);
    return ResponseModel.success(response);
  }

  @Post('send')
  @Version('1')
  async sendMessage(
    @Body('senderId') senderId: string,
    @Body('receiverId') receiverId: string,
    @Body('messageText') messageText: string,
  ) {
    const messageModel = await this.chatService.sendMessage(
      senderId,
      receiverId,
      messageText,
    );
    return ResponseModel.success(messageModel);
  }

  @Get('users')
  @Version('1')
  async getUsers() {
    const response = await this.chatService.getUsers();
    return ResponseModel.success(response);
  }
}
