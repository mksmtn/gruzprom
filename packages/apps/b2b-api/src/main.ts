/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { RedisOptions, Transport } from '@nestjs/microservices';
import { RedisConfig, redisConfig } from './app/app-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
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
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
