import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {GlobalService} from '../services/global.service';
import {normalizeUser} from '../core/utilities/common';
import {HotelConstants} from '../../constants/hotel_constants';

export function handleForm001Response(
  response: any,
  router: Router,
  authService: AuthService,
  globalService: GlobalService,
): void {
  const data = response.data;

  if (data.access && data.refresh) {
    authService.storeTokens(data.access, data.refresh);
  }

  // if (data?.user) {
  //   authService.storeUser(data.user, false); // 🔥 THIS triggers everything downstream
  //   if (data.user.lastHotelId) {
  //     globalService.setCurrentHotelId(data.user.lastHotelId);
  //   }
  // }
  // if (data?.user) {
  //   authService.storeUser(data.user, true);
  //
  //   const user = normalizeUser(data.user);
  //
  //   if (user) {
  //     globalService.setCurrentHotelId(
  //       user.lastHotelId || HotelConstants.NOT_APPLICABLE
  //     );
  //   }
  // }
  if (data?.user) {
    const user = normalizeUser(data.user);

    if (user) {
      globalService.setCurrentHotelId(
        user.lastHotelId || HotelConstants.NOT_APPLICABLE
      );

      authService.storeUser(user, true);
    }
  }


  if (data?.redirect) {
    void router.navigate([data.redirect]);
  }
}
