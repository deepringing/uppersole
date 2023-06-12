import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';
import { JoinRoomRequest, MessageRequest } from './dto/chat.request.dto';
import { MESSAGE } from './chat.constant';

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

  private getChatRooms = async (user: User) => await this.prisma.chatRoom.findMany({
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

    await this.prisma.chat.create({
      data: {
        text: message,
        userId: id,
        chatRoomId: parseInt(chatRoomId)
      }
    });

    socket.broadcast.to(`${chatRoomId}`).emit(MESSAGE, {
      message,
      id,
      chatRoomId
    });
  }

  async queryPreviousChat(id: string) {
    return (await this.prisma.chat.findMany({
      select: {
        user: { select: { nickname: true } },
        text: true,
        sentAt: true,
      },
      where: { chatRoomId: parseInt(id) },
      orderBy: { id: 'asc' }
    }));
  }

  async joinRoom(socket: Socket, user: User, request: JoinRoomRequest) {
    const { id } = user;
    const { targetUserId } = request;
    const chatRoom = await this.prisma.chatRoom.findFirst({
      where: {
        OR: [
          {
            AND: [
              { jillId: user.id },
              { jackId: parseInt(targetUserId) }
            ],
          },
          {
            AND: [
              { jillId: parseInt(targetUserId) },
              { jackId: user.id }
            ]
          },
        ],
      }
    });

    if (!chatRoom) {
      const chatRoom = await this.prisma.chatRoom.create({
        data: {
          jackId: id,
          jillId: parseInt(targetUserId)
        },
        select: {
          id: true
        },
      })

      socket.join(`${chatRoom.id}`);
    }
  }
}
