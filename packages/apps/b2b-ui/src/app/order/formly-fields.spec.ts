import { createFormlyFields } from './formly-fields';

describe('createFormlyFields', () => {
  it('should set valid min date', () => {
    const config = createFormlyFields({ today: '2023-05-01' });
    const dateFieldConfig = config.find(({ key }) => key === 'date');
    expect(dateFieldConfig?.props?.min).toEqual('2023-05-01');
  });

  it('should provide correct predefined dates', () => {
    const config = createFormlyFields({ today: '2023-04-30' });
    const dateFieldConfig = config.find(({ key }) => key === 'date');
    expect(dateFieldConfig?.props?.['predefinedValues']).toEqual([
      {
        value: '2023-04-30',
        label: 'Сегодня',
      },
      {
        value: '2023-05-01',
        label: 'Завтра',
      },
      {
        value: '2023-05-02',
        label: 'Послезавтра',
      },
    ]);
  });
});
