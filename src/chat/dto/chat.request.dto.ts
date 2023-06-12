import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MessageRequest {

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  chatRoomId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  message: string;
}

export class JoinRoomRequest {

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  targetUserId: string;
}
