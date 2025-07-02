import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import {MainComponent} from './core/components/main/main.component';
import {HomeComponent} from './core/components/home/home.component';
import {DashboardComponent} from './core/components/dashboard/dashboard.component';
import {LoginComponent} from './core/components/login/login.component';
import {NavigatorComponent} from './core/components/navigator/navigator.component';
import {Page001Component} from './core/pages/page001/page001.component';
import {Page004Component} from './core/pages/page004/page004.component';


export const routes: Routes = [
  {
    path: '',
    component: MainComponent,  // ✅ Main layout wraps pages
    children: [
      { path: '', redirectTo: '/navigator/001', pathMatch: 'full' },  // ✅ Redirect to home page
      { path: 'home', component: Page001Component},
      { path: 'navigator/:id', component: NavigatorComponent },
      // pages
      { path: 'page001', component: Page001Component },
      { path: 'page004', component: Page004Component },

      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

    ],
  },
  { path: 'login', component: LoginComponent },  // ✅ Ensure login route exists
  { path: '**', redirectTo: '/navigator/001' },  // ✅ Catch-all for invalid routes
];
