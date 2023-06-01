import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { LOCALE_ID } from '@angular/core';
import '@angular/common/locales/global/ru';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
}).catch((err) => console.error(err));
