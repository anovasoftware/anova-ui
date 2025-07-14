import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

export function handleForm001Response(
  response: any,
  router: Router,
  authService: AuthService
): void {
  const data = response.data;

  if (data.access && data.refresh) {
    authService.storeTokens(data.access, data.refresh);
  }
  if (data?.user) {
    authService.storeUser(data.user);
  }

  if (data?.redirect) {
    router.navigate([data.redirect]);
  } else {
    console.log('No redirect path specified by backend.');
  }
}
