import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import {MainComponent} from './core/components/main/main.component';
import {HomeComponent} from './core/components/home/home.component';
import {DashboardComponent} from './core/components/dashboard/dashboard.component';
import {LoginComponent} from './core/components/login/login.component';


export const routes: Routes = [
  {
    path: '',
    component: MainComponent,  // ✅ Main layout wraps pages
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },  // ✅ Redirect to home page
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: 'login', component: LoginComponent },  // ✅ Ensure login route exists
  { path: '**', redirectTo: 'home' },  // ✅ Catch-all for invalid routes
];
