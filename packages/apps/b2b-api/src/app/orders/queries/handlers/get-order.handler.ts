import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as Option from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { GetOrderQuery } from '../impl/get-order.query';
import { OrderRepository } from '../../repositories/order.repository';
import { OrderDto } from '../../dtos/order';
import { InternalServerErrorException } from '@nestjs/common';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetOrderQuery): Promise<OrderDto | undefined> {
    const result = await this.orderRepository.findById(query.id)();
    if (E.isRight(result)) {
      if (Option.isSome(result.right)) {
        return OrderDto.fromEntity(result.right.value);
      } else {
        return undefined;
      }
    } else {
      throw new InternalServerErrorException(result.left);
    }
  }
}
