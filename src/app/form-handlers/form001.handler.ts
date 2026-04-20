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
    authService.storeUser(data.user); // 🔥 THIS triggers everything downstream
  }

  if (data?.redirect) {
    void router.navigate([data.redirect]);
  }
}
// import { Router } from '@angular/router';
// import {AuthService} from '../services/auth.service';
// import {GlobalService} from '../services/global.service';
//
// export function handleForm001Response(
//   response: any,
//   router: Router,
//   authService: AuthService,
// ): void {
//   const data = response.data;
//
//   if (data.access && data.refresh) {
//     authService.storeTokens(data.access, data.refresh);
//   }
//   if (data?.user) {
//     authService.storeUser(data.user);
//   }
//   const hotelId = data.user?.lastHotelId;
//   if (hotelId) {
//   }
//
//   if (data?.redirect) {
//     void router.navigate([data.redirect]);
//   } else {
//     console.log('No redirect path specified by backend.');
//   }
// }
