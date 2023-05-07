import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { FieldType, FormlyModule } from '@ngx-formly/core';

@Component({
  standalone: true,
  selector: 'clr-formly-stepper',
  templateUrl: './stepper.html',
  imports: [
    CommonModule,
    ClarityModule,
    FormlyModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent extends FieldType {
  @HostBinding('class')
  readonly ngClass = ['block'];
}
