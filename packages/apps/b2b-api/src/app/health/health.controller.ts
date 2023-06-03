import { Controller, Get, Inject } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { RedisConfig, redisConfig } from '../app-config';

@Controller('health')
export class HealthController {
  constructor(
    @Inject(redisConfig.KEY) private readonly redisConfig: RedisConfig,
    private readonly health: HealthCheckService,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly mongo: MongooseHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.mongo.pingCheck('mongodb'),
      () =>
        this.microservice.pingCheck('redis', {
          transport: Transport.REDIS,
          options: this.redisConfig,
        }),
    ]);
  }
}
