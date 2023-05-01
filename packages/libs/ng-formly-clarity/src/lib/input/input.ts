import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  styles: [
    `
      :host
        display: block
    `,
  ],
})
export class InputComponent extends FieldType<FieldTypeConfig> {}
