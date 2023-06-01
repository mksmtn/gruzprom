import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from '../impl/order-created.event';
import { PubSubService } from '../../services/pub-sub.service';

@EventsHandler(OrderCreatedEvent)
export class PublishCreatedOrderHandler
  implements IEventHandler<OrderCreatedEvent>
{
  constructor(private readonly pubSub: PubSubService) {}

  handle(event: OrderCreatedEvent) {
    this.pubSub.receiveNewOrder(event.order);
  }
}
