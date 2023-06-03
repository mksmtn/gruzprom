import { OrderEntity } from '../../domain/order.entity';

export class OrderCreatedEvent {
  constructor(public readonly order: OrderEntity) {}
}
