import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrdersComponent } from './orders/orders';

@Component({
  standalone: true,
  selector: 'manager-ui-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OrdersComponent],
})
export class AppComponent {}
