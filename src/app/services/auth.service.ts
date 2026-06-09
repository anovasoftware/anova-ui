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
  private readonly ACCESS_TOKEN = 'accessToken';
  private readonly REFRESH_TOKEN = 'refreshToken';

  constructor(
    private http: HttpClient,
    private api: ApiService,
  ) {

  }

  // initializeSession(): void {
  //   const token = localStorage.getItem(this.ACCESS_TOKEN);
  //
  //   if (!token) {
  //     this.clearSession();
  //     return;
  //   }
  //
  //   this.api.get<ApiResponse<any>>('auth/session/')
  //     .subscribe({
  //       next: (response) => {
  //         if (response?.success && response?.data?.user) {
  //           this.storeUser(response.data.user, false);
  //         } else {
  //           this.clearSession();
  //         }
  //       },
  //       error: (error) => {
  //         console.error('initializeSession error', error);
  //         this.clearSession();
  //       }
  //     });
  // }

  initializeSession(): void {
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN);
    const userJson = localStorage.getItem('user');

    if (!accessToken || !userJson) {
      this.userSubject.next(null);
      return;
    }

    try {
      const user = JSON.parse(userJson);
      this.userSubject.next(user);
    } catch {
      this.clearSession();
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {username, password});
  }

  storeTokens(access: string, refresh: string) {
    localStorage.setItem(this.ACCESS_TOKEN, access);
    localStorage.setItem(this.REFRESH_TOKEN, refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private loadUserFromStorage(): User | null {
    // const storedUser = localStorage.getItem('user');
    // return storedUser ? JSON.parse(storedUser) : null;
    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) : null;
    return normalizeUser(user);

  }

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
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
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

