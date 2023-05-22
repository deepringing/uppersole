import { Get, Injectable } from '@nestjs/common';
import { CreateGroupRequest } from './dto/create.request';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {

  constructor(private readonly prisma: PrismaService) {}

  queryGroup(q: string) {
    return this.prisma.group.findMany({
      where: {
        name: {
          contains: q
        }
      }
    });
  }

  queryGroupMember(id: string) {
    return this.prisma.user.findMany({
      select: {
        nickname: true,
        description: true,
      },
      where: {
        groupId: parseInt(id)
      }
    })
  }

  async createGroup(request: CreateGroupRequest) {
    await this.prisma.group.create({
      data: request
    })
  }
}
