import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private users = new Map<string, number>();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.users.delete(client.id);
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() bodyData: any, @ConnectedSocket() client: Socket) {
    this.users.set(client.id, bodyData.userId);
    console.log(`${bodyData.userId} joined.`);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody() message: { sender: string; receiver: string; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('receiveMessage', message);
  }
}
