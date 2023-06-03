import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { ClarityModule } from '@clr/angular';
import { MapPipe } from '@gruzprom/angular-extra';
import { OrderDto, VehicleType } from '@gruzprom/api';

const vehicleNameMap: { [key in VehicleType]: string } = {
  [VehicleType.Unknown]: 'Неизвестно',
  [VehicleType.SmallVan]: 'Малая газель',
  [VehicleType.BiggerVan]: 'Большая газель',
  [VehicleType.Truck]: 'Фура',
};

@Component({
  standalone: true,
  selector: 'manager-ui-orders',
  templateUrl: './orders.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ClarityModule, MapPipe],
})
export class OrdersComponent implements OnInit, OnDestroy {
  protected readonly orders$ = new Subject<ReadonlyArray<OrderDto>>();
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

  protected readonly joinVehicles = (vehicles: ReadonlyArray<VehicleType>) =>
    vehicles.map((v) => vehicleNameMap[v]).join(', ');
}
