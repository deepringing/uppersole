import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class ChatService {

  async initSocket(socket, user: User) {
    const chatRooms = await this.getChatRooms(user);
    chatRooms.forEach(c =>
      socket.join()
    )
  }

  async sendChat(socket: Socket, message)
}
