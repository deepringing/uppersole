import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequest } from './dto/user.request';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  async signUp(@Body() request: SignUpRequest) {
    await this.userService.sinUp(request);
  }
}
