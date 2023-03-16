import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClarityModule } from '@clr/angular';

@Component({
  standalone: true,
  selector: 'b2b-ui-layout',
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ClarityModule],
})
export class LayoutComponent {}
