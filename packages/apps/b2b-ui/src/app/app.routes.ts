import { Route } from '@angular/router';
import { OrderComponent } from './order/order';
import { OrdersComponent } from './orders/orders';
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
    children: [
      {
        path: 'new',
        component: OrderComponent,
      },
      {
        path: 'list',
        component: OrdersComponent,
      },
    ],
  },
];
