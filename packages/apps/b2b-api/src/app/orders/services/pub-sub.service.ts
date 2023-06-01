import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../dtos/order';

@Injectable()
export class PubSubService {
  private readonly store = new BehaviorSubject<ReadonlyArray<Order>>([]);

  subscribeToOrders(): Observable<ReadonlyArray<Order>> {
    return this.store.asObservable();
  }

  receiveNewOrder(order: Order): void {
    this.store.next([...this.store.value, order]);
  }
}
