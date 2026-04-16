import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { GlobalService } from './services/global.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const authService = inject(AuthService);
          const globalService = inject(GlobalService);

          const token = authService.getAccessToken();
          const hotelId = globalService.currentHotelId;

          let modifiedReq = req;

          if (token) {
            modifiedReq = modifiedReq.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
          }

          if (hotelId && !modifiedReq.params.has('hotelId')) {
            modifiedReq = modifiedReq.clone({
              setParams: {
                hotelId: hotelId
              }
            });
          }

          return next(modifiedReq);
        }
      ])
    )
  ]
};
