import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from './dto/login.request';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async logIn(request: LoginRequest) {
    const user = await this.prisma.user.findUnique({
      where: { email: request.email }
    })

    const isPasswordValidate: boolean = await bcrypt.compare(request.password, user.password);

    if (!isPasswordValidate) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다.')
    }

    const payload = { email: user.email };

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
