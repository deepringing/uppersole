import { Injectable } from '@nestjs/common';

@Injectable()
export class WebSocketJwtExtractor {
  constructor() {}

  static fromHeader = function () {
    return function (request) {
      let token = null;
      if (request.auth.token) {
        token = request.auth.token;
      }
      return token;
    };
  };
}
