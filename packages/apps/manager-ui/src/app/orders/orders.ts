import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';
import { OrderComponent } from './order/order';

@Component({
  standalone: true,
  selector: 'manager-ui-orders',
  templateUrl: './orders.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OrderComponent],
})
export class OrdersComponent {
  protected readonly orders$ = of(['test']);
}
