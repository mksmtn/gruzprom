import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../impl/create-order.command';
import { Order } from '../../dtos/order';
import { OrderRepository } from '../../repositories/order.repository';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    return this.orderRepository.create(command.order);
  }
}
