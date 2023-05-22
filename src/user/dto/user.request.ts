import { IsEmail, IsInt, IsString, MaxLength, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequest {
  
  @IsString()
  @MaxLength(20)
  @ApiProperty()
  nickname: string;

  @IsEmail()
  @MaxLength(50)
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsInt()
  @ApiProperty()
  groupId: bigint;
}
