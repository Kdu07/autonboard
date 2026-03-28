import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-uqyy6ol8lbuu2abc.us.auth0.com',
      clientId: '3x9UYRHHosHBHPMqjjBdEWhfyLbKJ72G',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-uqyy6ol8lbuu2abc.us.auth0.com/api/v2/',
        scope: 'openid profile email offline_access',
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true
    }),
  ]
};