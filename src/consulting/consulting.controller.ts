import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ConsultingService } from './consulting.service';
import { ApplyConsultingRequest } from './dto/consulting.request';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../shared/decorators/auth.decorator';
import { User } from '@prisma/client';

@ApiTags('상담')
@Controller('consulting')
export class ConsultingController {

  constructor(private readonly consultingService: ConsultingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async applyConsulting(
    @CurrentUser() user: User,
    @Body() request: ApplyConsultingRequest
  ) {
    await this.consultingService.applyConsulting(user, request);
  }
}
