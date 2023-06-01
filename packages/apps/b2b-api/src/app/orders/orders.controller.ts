import { Body, Controller, Get, Post, Sse, MessageEvent } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from './commands/impl/create-order.command';
import { CreateOrderRequest } from './dtos/create-order';
import { ListOrdersQuery } from './queries/impl/list-orders.query';
import { Observable, map } from 'rxjs';
import { PubSubService } from './services/pub-sub.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly pubSubService: PubSubService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async createOrder(@Body('data') order: CreateOrderRequest) {
    const data = await this.commandBus.execute(new CreateOrderCommand(order));
    return { data };
  }

  @Get()
  async listOrders() {
    const data = await this.queryBus.execute(new ListOrdersQuery());
    return { data };
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.pubSubService
      .subscribeToOrders()
      .pipe(map((order) => ({ data: order })));
  }
}
