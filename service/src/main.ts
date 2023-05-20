import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SERVICE_PORT } from './shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' })
  await app.listen(SERVICE_PORT, () => Logger.log(`Service running on port: ${SERVICE_PORT}`));
}

bootstrap();