import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseApi = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  get(endpoint: string, params: any = {}, headers: any = {}): Observable<any> {
    const url = `${this.baseApi}${endpoint}`;
    const httpHeaders = new HttpHeaders(headers);
    const httpParams = new HttpParams({ fromObject: params });
    console.log(url);
    return this.http.get(url, { headers: httpHeaders, params: httpParams });
  }

  post(endpoint: string, body: any, headers: any = {}): Observable<any> {
    const url = `${this.baseApi}${endpoint}`;
    const httpHeaders = new HttpHeaders(headers);
    return this.http.post(url, body, { headers: httpHeaders });
  }

  // Add other methods like PUT, DELETE as needed
}
