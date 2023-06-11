import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import './shared/utils/bigint.util';
import './shared/utils/date.util';
import { SocketAdapter } from './shared/adapters/socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new SocketAdapter(app));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)


  const config = new DocumentBuilder()
    .setTitle('윈물 API')
    .setDescription('윈물이 맑아야 아랜물이 말그다')
    .setVersion('v.0.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3005);
}

bootstrap();
