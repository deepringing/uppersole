import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { CONNECT, INIT, SEND_MESSAGE } from './chat.constant';
import { UseGuards } from '@nestjs/common';
import { WebSocketJwtAuthGuard } from '../auth/jwt/socket-jwt.guard';
import { SocketCurrentUser } from '../shared/decorators/auth.decorator';
import { User } from '@prisma/client';
import { ChatService } from './chat.service';

@WebSocketGateway(3006, { namespace: 'chat' })
export class ChatGateway {

  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  namespace: Namespace;

  @SubscribeMessage(INIT)
  @UseGuards(WebSocketJwtAuthGuard)
  async handleInitSocket(
    @ConnectedSocket() socket: Socket,
    @SocketCurrentUser() user: User,
  ) {
    return await this.chatService.initSocket(socket, user);
  }

  @SubscribeMessage(SEND_MESSAGE)
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
