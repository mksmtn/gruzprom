import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { REDIS } from './tokens';
import { redisOrderCreatedChannelName } from './redis-channels';

@Injectable()
export class OrderProducer {
  constructor(@Inject(REDIS) private readonly clientProxy: ClientProxy) {}

  sendOrderCreatedMessage(orderId: string): Observable<unknown> {
    return this.clientProxy.emit(redisOrderCreatedChannelName(), orderId);
  }
}
