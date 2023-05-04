import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'b2b-ui-orders',
  templateUrl: './orders.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HttpClientModule],
})
export class OrdersComponent {
  protected readonly orders$ = this.httpClient
    .get<{ data: unknown[] }>('/api/orders')
    .pipe(map(({ data }) => data));

  constructor(private readonly httpClient: HttpClient) {}
}
