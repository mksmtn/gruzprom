import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'clr-formly-input',
  templateUrl: './input.html',
  imports: [ClarityModule, FormlyModule, ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends FieldType<FieldTypeConfig> {
  @HostBinding('class')
  readonly ngClass = ['block'];
}
