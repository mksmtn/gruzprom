import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { PredefinedValuesComponent } from '@gruzprom/ng-formly-clarity';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { distinctUntilChanged, interval, map, startWith } from 'rxjs';

const millisecondsInOneDay = 1000 * 60 * 60 * 24;

@Component({
  standalone: true,
  selector: 'b2b-ui-order',
  templateUrl: './order.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormlyModule, ReactiveFormsModule, ClarityModule],
})
export class OrderComponent {
  protected readonly datePredefinedValues$ = interval(1000 * 60).pipe(
    startWith(-1),
    map(() => new Date().toISOString().slice(0, 10)),
    distinctUntilChanged(),
    map(() => [
      {
        value: new Date().toISOString().slice(0, 10),
        label: 'Сегодня',
      },
      {
        value: new Date(Date.now() + millisecondsInOneDay)
          .toISOString()
          .slice(0, 10),
        label: 'Завтра',
      },
      {
        value: new Date(Date.now() + millisecondsInOneDay * 2)
          .toISOString()
          .slice(0, 10),
        label: 'Послезавтра',
      },
    ])
  );
  protected readonly formGroup = new FormGroup({});
  protected readonly model = {};
  protected readonly fields: FormlyFieldConfig[] = [
    {
      key: 'date',
      type: 'input',
      wrappers: [PredefinedValuesComponent],
      props: {
        label: 'Дата',
        type: 'date',
        required: true,
        predefinedValues: this.datePredefinedValues$,
      },
    },
    {
      key: 'time',
      type: 'input',
      props: {
        label: 'Время',
        type: 'time',
        required: true,
      },
    },
    {
      key: 'address',
      type: 'input',
      props: {
        label: 'Адрес',
        required: true,
      },
    },
    {
      key: 'contacts',
      type: 'input',
      props: {
        label: 'Контакты',
        required: true,
      },
    },
    {
      key: 'moverCount',
      type: 'input',
      props: {
        label: 'Кол-во грузчиков (опционально)',
        type: 'number',
        required: false,
      },
    },
    {
      key: 'comment',
      type: 'input',
      props: {
        label: 'Комментарий (опционально)',
        required: false,
      },
    },
    {
      key: 'paymentType',
      type: 'radio',
      defaultValue: 'cashless',
      props: {
        label: 'Тип оплаты',
        options: [
          {
            label: 'Безнал',
            value: 'cashless',
          },
          {
            label: 'Наличными',
            value: 'cash',
          },
        ],
      },
    },
    {
      key: 'vehicles',
      type: 'repeat',
      props: {
        addText: 'Добавить машину',
        label: 'Транспорт',
        description: 'Если требуется автотранспорт, добавьте машины тут',
      },
      fieldArray: {
        type: 'select',
        defaultValue: null,
        props: {
          placeholder: 'Тип',
          options: [
            {
              label: 'Не знаю тип',
              value: null,
            },
            {
              label: 'Малая газель',
              value: 'small',
            },
            {
              label: 'Большая газель',
              value: 'bigger',
            },
            {
              label: 'Фура',
              value: 'truck',
            },
          ],
        },
        expressions: {
          'props.label': (field: FormlyFieldConfig) =>
            typeof field.key === 'string'
              ? `Машина №${parseInt(field.key, 10) + 1}`
              : undefined,
        },
      },
    },
  ];

  protected onSubmit(): void {
    console.log(this.model);
  }
}
