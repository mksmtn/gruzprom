import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { FormlyModule } from '@ngx-formly/core';

import { allClarityFormlyTypes } from '@gruzprom/ng-formly-clarity';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';

const rootReducers = {};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideStore(rootReducers),
    provideEffects([]),
    provideAnimations(),
    importProvidersFrom(
      FormlyModule.forRoot({
        types: allClarityFormlyTypes,
      })
    ),
  ],
}).catch((err) => console.error(err));
