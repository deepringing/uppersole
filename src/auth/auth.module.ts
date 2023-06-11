import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { WebSocketJwtStrategy } from './jwt/socket-jwt.strategy';
import { WebSocketJwtExtractor } from './jwt/web-socket-jwt-extractors.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' }
    }),
  ],
  providers: [AuthService, JwtStrategy, WebSocketJwtStrategy, WebSocketJwtExtractor],
  controllers: [AuthController]
})
export class AuthModule {}
