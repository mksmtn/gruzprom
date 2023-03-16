import { Route } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout';
import { SignInComponent } from './sign-in/sign-in';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [],
  },
];
