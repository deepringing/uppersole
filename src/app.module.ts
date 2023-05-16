import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { ConsultingModule } from './consulting/consulting.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, GroupModule, ConsultingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
