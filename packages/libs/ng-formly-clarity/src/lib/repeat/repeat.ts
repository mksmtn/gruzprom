import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldArrayType, FormlyModule } from '@ngx-formly/core';

@Component({
  standalone: true,
  selector: 'clr-formly-repeat',
  templateUrl: './repeat.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormlyModule],
  styles: [
    `
    :host
      display: block
    `,
  ],
})
export class RepeatComponent extends FieldArrayType {}
