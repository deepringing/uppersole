import { IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConnectRequest {

  startDate: Date;

  consultantId: bigint;
}
