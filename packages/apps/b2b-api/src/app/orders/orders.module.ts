import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrdersController } from './orders.controller';
import { commandHandlers } from './commands/handlers';
import { queryHandlers } from './queries/handlers';
import { OrderRepository } from './repositories/order.repository';
import { PubSubService } from './services/pub-sub.service';
import { eventHandlers } from './events/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [OrdersController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    OrderRepository,
    PubSubService,
  ],
})
export class OrdersModule {}
