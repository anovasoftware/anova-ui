import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment'; // ✅ Import environment config
import { routes } from './app/app.routes';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';

// ✅ Enable production mode if running in production
if (environment.production) {
  console.log('production mode enabled'); // ✅ Confirm if production mode is activated
  enableProdMode();
}

// ✅ Handle bootstrap promise
bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes)
  ]
})
  .then(() => console.log('angular bootstrapped successfully!')) // ✅ Handle success
  .catch(err => console.error('angular failed to bootstrap:', err)); // ✅ Handle errors
