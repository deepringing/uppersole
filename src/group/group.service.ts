import { Get, Injectable } from '@nestjs/common';
import { CreateGroupRequest } from './dto/create.request';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {

  constructor(private readonly prisma: PrismaService) {}

  async queryGroup(q: string) {
    return (await this.prisma.group.findMany({
      where: {
        name: {
          contains: q
        }
      }
    }));
  }

  async queryGroupMember(id: string) {
    return (await this.prisma.user.findMany({
      select: {
        id: true,
        nickname: true,
        description: true,
      },
      where: {
        groupId: parseInt(id)
      }
    }));
  }

  async createGroup(request: CreateGroupRequest) {
    await this.prisma.group.create({
      data: request
    })
  }
}
