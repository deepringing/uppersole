import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login.request';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post()
  async logIn(@Body() request: LoginRequest) {
    return this.authService.logIn(request);
  }
}
