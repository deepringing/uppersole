import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { PrismaService } from '../../prisma/prisma.service';
import * as process from 'process';
import { WebSocketJwtExtractor } from './web-socket-jwt-extractors.service';

@Injectable()
export class WebSocketJwtStrategy extends PassportStrategy(Strategy, 'web-socket-jwt') {

  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: WebSocketJwtExtractor.fromHeader(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: true
    });
  }

  async validate(payload: Payload) {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        email: true,
      },
      where: {
        email: payload.email
      }
    })

    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
