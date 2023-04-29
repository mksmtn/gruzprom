import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { FormlyModule } from '@ngx-formly/core';

const rootReducers = {};

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideStore(rootReducers),
    provideEffects([]),
    provideAnimations(),
    importProvidersFrom(FormlyModule.forRoot(), FormlyBootstrapModule),
  ],
}).catch((err) => console.error(err));
