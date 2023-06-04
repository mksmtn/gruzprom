import { Module } from '@nestjs/common';
import { TaskEitherInterceptor } from './task-either.interceptor';

@Module({
  controllers: [],
  providers: [TaskEitherInterceptor],
  exports: [TaskEitherInterceptor],
})
export class NestjsFpModule {}
