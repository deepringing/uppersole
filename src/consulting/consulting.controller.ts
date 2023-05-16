import { Controller } from '@nestjs/common';
import { ConsultingService } from './consulting.service';

@Controller('consulting')
export class ConsultingController {

  constructor(private readonly consultingService: ConsultingService) {}
}
