import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {

  constructor(private readonly prisma: PrismaService) {}

  async initSocket(socket: Socket, user: User) {
    const chatRooms = await this.getChatRooms(user);
    chatRooms.forEach(c =>
      socket.join(`${c.id}`)
    )

    return chatRooms;
  }

  async sendChat(socket: Socket, message)

  private getChatRooms = async (user: User) => this.prisma.chatRoom.findMany({
    select: {
      id: true,
      jack: { select: { nickname: true } },
      jill: { select: { nickname: true } }
    },
    where: {
      OR: [
        { jillId: user.id },
        { jackId: user.id }
      ]
    }
  });
}
