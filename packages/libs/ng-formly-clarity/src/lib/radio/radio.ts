import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';

@Component({
  standalone: true,
  selector: 'clr-formly-radio',
  templateUrl: './radio.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ClarityModule,
    FormlyModule,
    FormlySelectModule,
    ReactiveFormsModule,
  ],
})
export class RadioComponent extends FieldType<FieldTypeConfig> {
  @HostBinding('class')
  readonly ngClass = ['block'];
}
