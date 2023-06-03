import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as E from 'fp-ts/Either';
import { ListOrdersQuery } from '../impl/list-orders.query';
import { OrderRepository } from '../../repositories/order.repository';
import { OrderDto } from '../../dtos/order';
import { InternalServerErrorException } from '@nestjs/common';

@QueryHandler(ListOrdersQuery)
export class ListOrdersHandler implements IQueryHandler<ListOrdersQuery> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<OrderDto[]> {
    const orders = await this.orderRepository.list()();
    if (E.isRight(orders)) {
      return orders.right.map(OrderDto.fromEntity);
    } else {
      throw new InternalServerErrorException(orders.left);
    }
  }
}
