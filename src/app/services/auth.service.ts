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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected readonly TypeConstants = TypeConstants;
  protected readonly MenuConstants = MenuConstants;
  protected readonly HotelConstants = HotelConstants;


  private apiUrl = 'http://localhost:8000/api/token/';
  private userSubject = new BehaviorSubject<any>(this.loadUserFromStorage());
  user$ = this.userSubject.asObservable();


  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {username, password})
      .pipe(
        tap(response => {
          this.storeTokens(response.access, response.refresh);
        })
      );
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

  private loadUserFromStorage(): any {
    // const storedUser = localStorage.getItem('user');
    // return storedUser ? JSON.parse(storedUser) : null;
    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) : null;
    return normalizeUser(user);

  }

  storeUser(user: any): void {
    const normalized = normalizeUser(user);
    localStorage.setItem('user', JSON.stringify(normalized));
    localStorage.setItem('currentMenuId', this.MenuConstants.HOME);
    this.userSubject.next(normalized);
  }


  clearUser(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('currentMenuId');
    localStorage.removeItem('currentHotelId');
    this.clearUser();
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

}

