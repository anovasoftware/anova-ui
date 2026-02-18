import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        (req, next) => {
          // console.log('INTERCEPTOR HIT:', req.url);

          const authService = inject(AuthService);
          const token = authService.getAccessToken();

          if (!token) {
            return next(req);
          }

          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });

          return next(authReq);
        }
      ])
    )
  ]
};
