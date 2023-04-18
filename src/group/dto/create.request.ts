import { IsString, MaxLength, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GroupType } from '@prisma/client';

export class CreateGroupRequest {

  @IsString()
  @MaxLength(20)
  @ApiProperty()
  name: string;

  @IsString()
  @MaxLength(20)
  @ApiProperty()
  domain: string;

  @ApiProperty({
    enum: GroupType
  })
  type: GroupType;
}
