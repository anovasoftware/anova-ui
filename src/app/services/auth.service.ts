import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user';
import {normalizeUser} from '../core/utilities/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
    this.userSubject.next(normalized);
  }


  clearUser(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.clearUser();
  }

}

