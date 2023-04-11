import { IsEmail, IsString, MaxLength, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {

  @IsEmail()
  @MaxLength(50)
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
