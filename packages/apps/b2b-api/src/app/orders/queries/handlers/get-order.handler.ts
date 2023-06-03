import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderQuery } from '../impl/get-order.query';
import { OrderRepository } from '../../repositories/order.repository';
import { Order } from '../../dtos/order';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetOrderQuery): Promise<Order | undefined> {
    return this.orderRepository.findById(query.id);
  }
}
