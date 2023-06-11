import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WebSocketJwtAuthGuard extends AuthGuard('web-socket-jwt') {

  constructor() {super();}

  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }
}
