import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyConsultingRequest } from './dto/consulting.request';
import { User } from '@prisma/client';

@Injectable()
export class ConsultingService {

  constructor(private readonly prisma: PrismaService) {}

  async applyConsulting(user: User, request: ApplyConsultingRequest) {
    const endDate = new Date(request.startDate);
    endDate.setHours(endDate.getHours() + 1);

    await this.prisma.consulting.create({
      data: {
        consultantId: request.consultantId,
        counseleeId: user.id,
        startDate: request.startDate,
        endDate: endDate
      }
    })
  }

  async handleConsultingApplication(user: User, id: string, approve: boolean) {
    const consulting = await this.prisma.consulting.findUnique({
      select: {
        consultantId: true
      },
      where: {
        id: parseInt(id)
      },
    })

    if (user.id !== consulting.consultantId) {
      throw new UnauthorizedException('권한이 없습니다');
    }

    await this.prisma.consulting.update({
      where: {
        id: parseInt(id)
      },
      data: {
        state: approve ? 'APPROVED' : 'REJECTED'
      }
    })
  }
}
