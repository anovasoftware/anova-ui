import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { appConfig } from './app/app.config';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('angular bootstrapped successfully!'))
  .catch(err => console.error('angular failed to bootstrap:', err));
