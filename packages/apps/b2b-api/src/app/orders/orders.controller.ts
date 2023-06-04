import {
  Body,
  Controller,
  Get,
  Post,
  Sse,
  MessageEvent,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, Payload, RpcException } from '@nestjs/microservices';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import * as TE from 'fp-ts/TaskEither';
import { CreateOrderByCustomerRequest } from '@gruzprom/api';
import { LoggerService } from '@gruzprom/nestjs-logger';
import { TaskEitherInterceptor } from '@gruzprom/nestjs-fp';
import { CreateOrderByCustomerCommand } from './commands/impl/create-order-by-customer.command';
import { ListOrdersQuery } from './queries/impl/list-orders.query';
import { GetOrderQuery } from './queries/impl/get-order.query';
import { redisOrderCreatedChannelName } from './adapters/redis-channels';
import { pipe } from 'fp-ts/lib/function';

@Controller('orders')
export class OrdersController {
  private readonly orders$ = new BehaviorSubject<ReadonlyArray<string>>([]);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly logger: LoggerService
  ) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.orders$.pipe(switchMap(() => this.listOrders()));
  }

  @EventPattern(redisOrderCreatedChannelName())
  @UseInterceptors(TaskEitherInterceptor)
  consumeOrder(@Payload() orderId: string): TE.TaskEither<RpcException, void> {
    return pipe(
      TE.of(this.orders$.next([...this.orders$.value, orderId])),
      TE.tapIO(() => this.logger.debug('Received an new order: ' + orderId))
    );
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
