// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import {GlobalService} from '../services/global.service';
//
// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//
//   constructor(
//     private authService: AuthService,
//     private globalService: GlobalService
//   ) {}
//
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log('JwtInterceptor running');
//     const token = this.authService.getAccessToken();
//     const hotelId = this.globalService.currentHotelId;
//     console.log('hotelId', hotelId);
//     let modifiedReq = req;
//
//     // ✅ Add Authorization header
//     if (token) {
//       modifiedReq = modifiedReq.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }
//
//     // ✅ Add hotelId as query param (if not already present)
//     if (hotelId && !modifiedReq.params.has('hotelId')) {
//       modifiedReq = modifiedReq.clone({
//         setParams: {
//           hotelId: hotelId
//         }
//       });
//     }
//
//     return next.handle(modifiedReq);
//   }
// }
