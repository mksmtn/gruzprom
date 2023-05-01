import { InputComponent } from './input/input';
import { RadioComponent } from './radio/radio';
import { RepeatComponent } from './repeat/repeat';
import { SelectComponent } from './select/select';

export const allClarityFormlyTypes = [
  {
    name: 'input',
    component: InputComponent,
  },
  {
    name: 'radio',
    component: RadioComponent,
  },
  {
    name: 'repeat',
    component: RepeatComponent,
  },
  {
    name: 'select',
    component: SelectComponent,
  },
];
