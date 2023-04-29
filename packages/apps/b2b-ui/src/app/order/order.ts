import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';

@Component({
  standalone: true,
  selector: 'b2b-ui-order',
  templateUrl: './order.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormlyModule, ReactiveFormsModule],
})
export class OrderComponent {
  protected readonly formGroup = new FormGroup({});
  protected readonly model = {};
  protected readonly fields: FormlyFieldConfig[] = [
    {
      key: 'comment',
      type: 'textarea',
      props: {
        label: 'Комментарий',
      },
    },
    {
      key: 'loaderCount',
      type: 'number',
      props: {
        label: 'Количество грузчиков',
      },
    },
    {
      key: 'address',
      type: 'input',
      props: {
        label: 'Адрес',
      },
    },
  ];

  protected onSubmit(): void {
    console.log(this.model);
  }
}
