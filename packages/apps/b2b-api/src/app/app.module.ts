import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { MongoConfig, mongoConfig, redisConfig } from './app-config';
import { HealthModule } from './health/health.module';
import { NestjsLoggerModule } from '@gruzprom/nestjs-logger';

@Module({
  imports: [
    // Dependencies
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [mongoConfig, redisConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongoConfig)],
      inject: [mongoConfig.KEY],
      useFactory: (config: MongoConfig) => ({
        uri: `mongodb://${config.host}:${config.port}`,
      }),
    }),
    NestjsLoggerModule,

    // App
    OrdersModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
