import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { CONNECT, JOIN_ROOM } from './chat.constant';

@WebSocketGateway(3006, { namespace: 'chat' })
export class ChatGateway {

  @WebSocketServer()
  namespace: Namespace;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage(CONNECT)
  connectSomeone(@MessageBody() data: string, @ConnectedSocket() client) {
    const [nickname, room] = data;
    this.server.emit
    this.wsClients.push(client);
  }
}
