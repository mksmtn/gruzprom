import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrdersController } from './orders.controller';
import { commandHandlers } from './commands/handlers';
import { queryHandlers } from './queries/handlers';
import { OrderRepository } from './repositories/order.repository';
import { eventHandlers } from './events/handlers';
import { OrderProducer } from './adapters/order.producer';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REDIS } from './adapters/tokens';
import { ConfigModule } from '@nestjs/config';
import { RedisConfig, redisConfig } from '../app-config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModel, OrderSchema } from './repositories/order.schema';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: REDIS,
        imports: [ConfigModule.forFeature(redisConfig)],
        inject: [redisConfig.KEY],
        useFactory: (options: RedisConfig) => ({
          transport: Transport.REDIS,
          options,
        }),
      },
    ]),
    MongooseModule.forFeature([{ name: OrderModel.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    OrderRepository,
    OrderProducer,
  ],
})
export class OrdersModule {}
