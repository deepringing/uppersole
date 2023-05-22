import { IsDateString, IsInt, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyConsultingRequest {

  @IsDateString()
  @ApiProperty()
  startDate: Date;

  @IsInt()
  @ApiProperty()
  consultantId: bigint;
}
