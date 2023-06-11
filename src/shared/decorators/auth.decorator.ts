import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WsParamtype } from '@nestjs/websockets/enums/ws-paramtype.enum';
import { SocketCurrentUserPipe } from '../pipes/auth.pipe';
import { createWsParamDecorator } from '@nestjs/websockets/utils';

export const CurrentUser = createParamDecorator((
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
))

export const SocketCurrentUser = createWsParamDecorator(WsParamtype.SOCKET)(new SocketCurrentUserPipe());
