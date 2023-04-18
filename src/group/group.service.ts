import { Injectable } from '@nestjs/common';
import { CreateGroupRequest } from './dto/create.request';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {

  constructor(private readonly prisma: PrismaService) {}

  async createGroup(request: CreateGroupRequest) {
    await this.prisma.group.create({
      data: request
    })
  }
}
