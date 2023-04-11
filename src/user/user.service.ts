import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dto/user.request';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) {}

  async sinUp(request: SignUpRequest) {
    await this.prisma.user.create({
      data: {
        ...request,
        password: await bcrypt.hash(request.password, 10)
      }
    })
  }
}
