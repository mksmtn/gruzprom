import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrdersController } from './orders.controller';
import { commandHandlers } from './commands/handlers';
import { queryHandlers } from './queries/handlers';
import { OrderRepository } from './repositories/order.repository';

@Module({
  imports: [CqrsModule],
  controllers: [OrdersController],
  providers: [...commandHandlers, ...queryHandlers, OrderRepository],
})
export class OrdersModule {}
