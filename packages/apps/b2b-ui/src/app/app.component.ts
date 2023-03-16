import { RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
  ],
  selector: 'gruzprom-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {}
