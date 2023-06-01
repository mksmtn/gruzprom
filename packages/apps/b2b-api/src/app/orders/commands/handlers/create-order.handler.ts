import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../impl/create-order.command';
import { Order } from '../../dtos/order';
import { OrderRepository } from '../../repositories/order.repository';
import { OrderCreatedEvent } from '../../events/impl/order-created.event';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    const order = await this.orderRepository.create(command.order);
    this.eventBus.publish(new OrderCreatedEvent(order));
    return order;
  }
}
