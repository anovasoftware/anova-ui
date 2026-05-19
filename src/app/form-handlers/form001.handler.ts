import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

export function handleForm001Response(
  response: any,
  router: Router,
  authService: AuthService,
): void {
  const data = response.data;

  if (data.access && data.refresh) {
    authService.storeTokens(data.access, data.refresh);
  }

  if (data?.user) {
    console.log(data.user);
    authService.storeUser(data.user, true); // 🔥 THIS triggers everything downstream
  }

  if (data?.redirect) {
    void router.navigate([data.redirect]);
  }
}
