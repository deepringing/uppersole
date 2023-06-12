import { Injectable } from '@nestjs/common';

@Injectable()
export class WebSocketJwtExtractor {
  constructor() {}

  static fromHeader = function () {
    return function (request) {
      if (request.headers.authorization) {
        const token = request.headers.authorization;
        return token.replace('Bearer ', '');
      }

      return null;
    };
  };
}
