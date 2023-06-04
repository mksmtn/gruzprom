import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { LoggerService } from './logger.service';

const isProd = process.env['NODE_ENV'] === 'production';

@Module({
  controllers: [],
  providers: [LoggerService],
  exports: [LoggerService],
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: isProd ? 'info' : 'trace',
        transport: isProd ? undefined : { target: 'pino-pretty' },
      },
      exclude: ['health'],
    }),
  ],
})
export class NestjsLoggerModule {}
