import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { Order } from '../../dtos/order';
import { ClarityModule } from '@clr/angular';

@Component({
  standalone: true,
  selector: 'manager-ui-orders',
  templateUrl: './orders.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ClarityModule],
})
export class OrdersComponent implements OnInit, OnDestroy {
  protected readonly orders$ = new Subject<ReadonlyArray<Order>>();
  private eventSource?: EventSource;
  private readonly sub = new Subscription();

  ngOnInit(): void {
    this.eventSource = new EventSource('/api/orders/sse');
    const sub = fromEvent<MessageEvent>(this.eventSource, 'message').subscribe({
      next: (event) => {
        console.log('Received a server event', event);
        this.orders$.next(JSON.parse(event.data));
      },
    });
    this.sub.add(sub);
  }

  ngOnDestroy(): void {
    this.eventSource?.close();
    this.sub.unsubscribe();
  }
}
