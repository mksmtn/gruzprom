import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'b2b-ui-orders',
  templateUrl: './orders.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {}
