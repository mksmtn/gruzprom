import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from '../impl/order-created.event';
import { OrderProducer } from '../../adapters/order.producer';

@EventsHandler(OrderCreatedEvent)
export class PublishCreatedOrderHandler
  implements IEventHandler<OrderCreatedEvent>
{
  constructor(private readonly orderProducer: OrderProducer) {}

  handle(event: OrderCreatedEvent) {
    return this.orderProducer.sendOrderCreatedMessage(event.order.id);
  }
}
