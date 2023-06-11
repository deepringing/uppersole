import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SocketCurrentUserPipe implements PipeTransform {
  transform(socket: any) {
    return socket.handshake.user;
  }
}
