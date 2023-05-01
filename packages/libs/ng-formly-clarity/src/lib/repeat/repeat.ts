import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FieldArrayType, FormlyModule } from '@ngx-formly/core';

@Component({
  standalone: true,
  selector: 'clr-formly-repeat',
  templateUrl: './repeat.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormlyModule],
})
export class RepeatComponent extends FieldArrayType {
  @HostBinding('class')
  readonly ngClass = ['block'];
}
