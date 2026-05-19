import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user';
import {normalizeUser} from '../core/utilities/common';
import {TypeConstants} from '../../constants/type_constants';
import {MenuConstants} from '../../constants/menu_constants';
import {HotelConstants} from '../../constants/hotel_constants';
import {ApiService} from './api.service';
import {ApiResponse} from '../models/api-response';
import {GlobalService} from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected readonly TypeConstants = TypeConstants;
  protected readonly MenuConstants = MenuConstants;
  protected readonly HotelConstants = HotelConstants;


  private apiUrl = 'http://localhost:8000/api/token/';
  private userSubject = new BehaviorSubject<User | null>(this.loadUserFromStorage());
  user$ = this.userSubject.asObservable();


  constructor(
    private http: HttpClient,
    private api: ApiService,
    ) {

  }

  initializeSession(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.clearSession();
      return;
    }

    this.api.get<ApiResponse<any>>('auth/session/')
      .subscribe({
        next: (response) => {
          if (response?.success && response?.data?.user) {
            this.storeUser(response.data.user, false);
          } else {
            this.clearSession();
          }
        },
        error: () => {
          this.clearSession();
        }
      });
  }

//   login(username: string, password: string): Observable<any> {
//     return this.http.post<any>(this.apiUrl, {username, password})
//       .pipe(
//         tap(response => {
//           this.storeTokens(response.access, response.refresh);
//         })
//       );
//   }
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {username, password});
  }

  storeTokens(access: string, refresh: string) {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  private loadUserFromStorage(): User | null {
    // const storedUser = localStorage.getItem('user');
    // return storedUser ? JSON.parse(storedUser) : null;
    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) : null;
    return normalizeUser(user);

  }

  // storeUser(user: any): void {
  //   const normalized = normalizeUser(user);
  //   localStorage.setItem('user', JSON.stringify(normalized));
  //   localStorage.setItem('currentMenuId', this.MenuConstants.HOME);
  //   localStorage.setItem(
  //     'currentHotelId',
  //     normalized?.lastHotelId || this.HotelConstants.NOT_APPLICABLE
  //   );
  //   this.userSubject.next(normalized);
  // }
  storeUser(user: any, resetContext = true): void {
    const normalized = normalizeUser(user);

    localStorage.setItem('user', JSON.stringify(normalized));

    if (resetContext) {
      localStorage.setItem('currentMenuId', this.MenuConstants.HOME);
      localStorage.setItem(
        'currentHotelId',
        normalized?.lastHotelId || this.HotelConstants.NOT_APPLICABLE
      );
    }

    this.userSubject.next(normalized);
  }

  logout(): void {
    this.clearSession();
  }

  clearSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('currentMenuId');
    localStorage.removeItem('currentHotelId');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getCurrentHotelId(): string {
    return localStorage.getItem('currentHotelId') || this.HotelConstants.NOT_APPLICABLE;
  }

  setCurrentHotelId(hotelId: string): void {
    localStorage.setItem('currentHotelId', hotelId);
  }

  getCurrentMenuId(): string {
    return localStorage.getItem('currentMenuId') || this.MenuConstants.HOME;
  }

  setCurrentMenuId(menuId: string): void {
    localStorage.setItem('currentMenuId', menuId);
  }

  getUserProfile(): Observable<ApiResponse<any>> {
    return this.api.get('utilities/base/user/profile');

  }

  // updateLastHotelId(hotelId: string): void {
  //   const user = this.userSubject.value;
  //   if (!user) {
  //     return;
  //   }
  //
  //   this.userSubject.next({
  //     ...user,
  //     lastHotelId: hotelId
  //   });
  // }
}

