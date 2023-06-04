/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RedisOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app/app.module';
import { RedisConfig, redisConfig } from './app/app-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api');
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const redisOptions = app.get<RedisConfig>(redisConfig.KEY);
  app.connectMicroservice<RedisOptions>({
    transport: Transport.REDIS,
    options: {
      host: redisOptions.host,
      port: redisOptions.port,
    },
  });
  const port = process.env.PORT || 3000;
  await app.startAllMicroservices();
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
