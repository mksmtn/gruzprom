import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ConfigModule } from '@nestjs/config';
import { redisConfig } from '../app-config';

@Module({
  imports: [TerminusModule, ConfigModule.forFeature(redisConfig)],
  controllers: [HealthController],
})
export class HealthModule {}
