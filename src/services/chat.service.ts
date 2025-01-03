import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities/chat.entity';
import { UserRepository } from '../repositories/user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message, 'app_db')
    private readonly messageRepository: Repository<Message>,
    private readonly userRepository: UserRepository,
  ) {}

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
  async getMessages(senderId: string, receiverId: string) {
    return this.messageRepository.find({
      where: [
        { sender: { id: senderId }, receiver: { id: receiverId } },
        { sender: { id: receiverId }, receiver: { id: senderId } },
      ],
      relations: ['sender', 'receiver'],
      order: { created_at: 'ASC' },
    });
  }

  async sendChatMessage(
    senderId: string,
    receiverId: string,
    messageText: string,
  ) {
    const message = this.messageRepository.create({
      sender: { id: senderId },
      receiver: { id: receiverId },
      message_text: messageText,
      attact_file: '',
    });
    const chat = this.messageRepository.save(message);
    return chat;
  }

  async getUsers() {
    return this.userRepository.findAll();
  }
}
