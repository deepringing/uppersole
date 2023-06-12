import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MessageRequest {

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  chatRoomId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  message: string;
}
