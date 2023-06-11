import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { ConsultingModule } from './consulting/consulting.module';
import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './chat/chat.gateway';
import { Cha†Service } from './cha†/cha†.service';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, GroupModule, ConsultingModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, ChatGateway, Cha†Service, ChatService],
})
export class AppModule {}
