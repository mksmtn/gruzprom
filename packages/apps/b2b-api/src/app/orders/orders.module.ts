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

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: REDIS,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
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
