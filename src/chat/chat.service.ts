import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';
import { MessageRequest } from './dto/chat.request.dto';
import { MESSAGE, SEND_MESSAGE } from './chat.constant';

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

  async sendChat(socket: Socket, user: User, request: MessageRequest) {
    const { message, chatRoomId } = request;
    const { id } = user;

    this.prisma.chat.create({
      data: {
        text: message,
        userId: id,
        chatRoomId: chatRoomId
      }
    });

    socket.broadcast.to(`${chatRoomId}`).emit(MESSAGE, {
      message,
      id,
      chatRoomId
    });
  }
}
