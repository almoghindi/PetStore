import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { cartReducer } from './core/store/cart.reducer';
export const SERVER_URL = new InjectionToken<string>('server url');
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: SERVER_URL,
      useValue:
        'https://petshopserverwebapi20240314181346.azurewebsites.net/api/',
    },
    provideHttpClient(),
    provideRouter(routes),
    provideStore({ cart: cartReducer }),
    provideEffects(),
  ],
};
