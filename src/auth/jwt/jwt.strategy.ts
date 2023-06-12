import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { PrismaService } from '../../prisma/prisma.service';
import * as process from 'process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false
    });
  }

  async validate(payload: Payload) {
    const user = this.prisma.user.findUnique({
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
