import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';

@ApiTags('채팅')
@Controller('chat')
export class ChatController {

  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:chat-room-id')
  async queryPreviousChat(
    @Param('chat-room-id') id: string
  ) {
    await this.chatService.queryPreviousChat(id);
  }
}
