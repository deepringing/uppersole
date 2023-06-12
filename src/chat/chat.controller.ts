import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';

@ApiTags('채팅')
@Controller('chat')
export class ChatController {

  constructor(private readonly chatService: ChatService) {}

  @ApiParam({ name: 'id', description: 'chat room id' })
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async queryPreviousChat(
    @Param('id') id: string
  ) {
    return await this.chatService.queryPreviousChat(id);
  }
}
