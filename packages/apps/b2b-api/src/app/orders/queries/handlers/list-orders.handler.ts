import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListOrdersQuery } from '../impl/list-orders.query';
import { OrderRepository } from '../../repositories/order.repository';
import { Order } from '../../dtos/order';

@QueryHandler(ListOrdersQuery)
export class ListOrdersHandler implements IQueryHandler<ListOrdersQuery> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    return this.orderRepository.list();
  }
}
