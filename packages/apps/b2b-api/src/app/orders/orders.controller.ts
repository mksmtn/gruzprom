import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from './commands/impl/create-order.command';
import { CreateOrderRequest } from './dtos/create-order';
import { ListOrdersQuery } from './queries/impl/list-orders.query';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
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
}
