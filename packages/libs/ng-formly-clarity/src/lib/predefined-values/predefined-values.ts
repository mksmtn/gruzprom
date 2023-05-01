import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import {
  FormlySelectModule,
  FormlySelectOption,
} from '@ngx-formly/core/select';
import { Observable } from 'rxjs';

interface FormlyFieldConfigWithPredefinedValues extends FormlyFieldConfig {
  predefinedValues:
    | FormlySelectOption[]
    | Observable<FormlySelectOption[]>
    | Promise<FormlySelectOption[]>;
}

@Component({
  standalone: true,
  selector: 'clr-formly-predefined-values',
  templateUrl: './predefined-values.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ClarityModule, FormlySelectModule],
})
export class PredefinedValuesComponent extends FieldWrapper<FormlyFieldConfigWithPredefinedValues> {
  @HostBinding('class')
  readonly ngClass = ['block'];

  protected setValue(value: FormlySelectOption): void {
    this.field.formControl?.setValue(value.value);
  }
}
