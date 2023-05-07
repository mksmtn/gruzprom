import { PredefinedValuesComponent } from '@gruzprom/ng-formly-clarity';
import { FormlyFieldConfig } from '@ngx-formly/core';

const millisecondsInOneDay = 1000 * 60 * 60 * 24;

const createPredefinedDates = (today: string) => {
  const [year, month, day] = today.split('-').map((n) => parseInt(n, 10));
  const todayTime = Date.UTC(year, month - 1, day);
  return [
    {
      value: today,
      label: 'Сегодня',
    },
    {
      value: new Date(todayTime + millisecondsInOneDay)
        .toISOString()
        .slice(0, 10),
      label: 'Завтра',
    },
    {
      value: new Date(todayTime + millisecondsInOneDay * 2)
        .toISOString()
        .slice(0, 10),
      label: 'Послезавтра',
    },
  ];
};

export const createFormlyFields = ({
  today,
}: {
  today: string;
}): FormlyFieldConfig[] => [
  {
    type: 'stepper',
    fieldGroup: [
      {
        props: {
          label: 'Основная информация',
          description: 'Обязательно к заполнению',
        },
        className: 'block mb-4',
        fieldGroup: [
          {
            key: 'date',
            type: 'input',
            wrappers: [PredefinedValuesComponent],
            props: {
              label: 'Дата',
              type: 'date',
              required: true,
              predefinedValues: createPredefinedDates(today),
              // https://github.com/ngx-formly/ngx-formly/issues/3663
              min: today as unknown as number,
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
        ],
      },
      {
        props: { label: 'Детали', description: 'Опционально' },
        fieldGroup: [
          {
            key: 'comment',
            type: 'input',
            props: {
              label: 'Комментарий',
              required: false,
            },
          },
          {
            key: 'moverCount',
            type: 'input',
            className: 'block mb-3',
            props: {
              label: 'Кол-во грузчиков',
              type: 'number',
              required: false,
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
        ],
      },
    ],
  },
];
