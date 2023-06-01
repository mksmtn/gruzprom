import { Order } from '../../dtos/order';

export class OrderCreatedEvent {
  constructor(public readonly order: Order) {}
}
