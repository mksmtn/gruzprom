import {
  Body,
  Controller,
  Get,
  Post,
  Sse,
  MessageEvent,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderByCustomerRequest } from '@gruzprom/api';
import { CreateOrderByCustomerCommand } from './commands/impl/create-order-by-customer.command';
import { ListOrdersQuery } from './queries/impl/list-orders.query';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { GetOrderQuery } from './queries/impl/get-order.query';
import { redisOrderCreatedChannelName } from './adapters/redis-channels';

@Controller('orders')
export class OrdersController {
  private readonly orders$ = new BehaviorSubject<ReadonlyArray<string>>([]);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.orders$.pipe(switchMap(() => this.listOrders()));
  }

  @EventPattern(redisOrderCreatedChannelName())
  async consumeOrder(@Payload() orderId: string) {
    this.orders$.next([...this.orders$.value, orderId]);
  }

  @Post()
  async createOrder(@Body('data') order: CreateOrderByCustomerRequest) {
    const customer = {
      id: 'todo',
    };
    await this.commandBus.execute(
      new CreateOrderByCustomerCommand(order, customer)
    );
  }

  @Get()
  async listOrders() {
    const data = await this.queryBus.execute(new ListOrdersQuery());
    return { data };
  }

  @Get(':id')
  async getOrder(id: string) {
    const data = await this.queryBus.execute(new GetOrderQuery(id));
    if (!data) {
      throw new NotFoundException();
    }
    return {
      data,
    };
  }
}
