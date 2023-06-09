import { Body, Controller, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ConsultingService } from './consulting.service';
import { ApplyConsultingRequest } from './dto/consulting.request';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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

  @ApiParam({ name: 'id' })
  @ApiQuery({ name: 'approve' })
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async handleConsultingApplication(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Query('approve') approve: boolean
  ) {
    await this.consultingService.handleConsultingApplication(user, id, approve);
  }
}
