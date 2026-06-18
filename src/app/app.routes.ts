import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import {MainComponent} from './core/components/main/main.component';
import {HomeComponent} from './core/components/home/home.component';
import {DashboardComponent} from './core/components/dashboard/dashboard.component';
import {LoginComponent} from './core/components/login/login.component';
import {NavigatorComponent} from './core/components/navigator/navigator.component';
import {Page001Component} from './core/pages/page001/page001.component';
import {Page002Component} from './core/pages/page002/page002.component';
import {Page003Component} from './core/pages/page003/page003.component';
import {Page004Component} from './core/pages/page004/page004.component';
import {Page005Component} from './core/pages/page005/page005.component';
import {Page006Component} from './core/pages/page006/page006.component';
import {Page007Component} from './core/pages/page007/page007.component';
import {Page008Component} from './core/pages/page008/page008.component';
import {Page009Component} from './core/pages/page009/page009.component';
import {Page010Component} from './core/pages/page010/page010.component';


export const routes: Routes = [
  {
    path: '',
    component: MainComponent,  // ✅ Main layout wraps pages
    children: [
      { path: '', redirectTo: 'navigator/001', pathMatch: 'full' },  // ✅ Redirect to home page
      { path: 'home', component: Page001Component},
      { path: 'navigator/:id', component: NavigatorComponent },
      // pages
      { path: 'page001', component: Page001Component },
      { path: 'page002', component: Page002Component },
      { path: 'page003', component: Page003Component },
      { path: 'page004', component: Page004Component },
      { path: 'page005', component: Page005Component },
      { path: 'page006', component: Page006Component },
      { path: 'page007', component: Page007Component },
      { path: 'page008', component: Page008Component },
      { path: 'page009', component: Page009Component },
      { path: 'page010', component: Page010Component },

      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

    ],
  },
  { path: 'login', component: LoginComponent },  // ✅ Ensure login route exists
  { path: '**', redirectTo: '/navigator/001' },  // ✅ Catch-all for invalid routes
];
