import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequest } from './dto/user.request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('사용자')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  async signUp(@Body() request: SignUpRequest) {
    await this.userService.sinUp(request);
  }
}
