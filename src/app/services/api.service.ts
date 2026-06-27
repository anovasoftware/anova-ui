import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ApiService {
  private baseApi = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  // get<T>(urlExt: string, params: any = {}, headers: any = {}): Observable<T> {
  //   const url = `${this.baseApi}${urlExt}`;
  //   const httpHeaders = new HttpHeaders(headers);
  //   const httpParams = new HttpParams({ fromObject: params });
  //   console.log(httpParams);
  //   return this.http.get<T>(url, { headers: httpHeaders, params: httpParams });
  // }
  get<T>(
    urlExt: string,
    params: HttpParams | Record<string, any> = {},
    headers: any = {}
  ): Observable<T> {
    const url = `${this.baseApi}${urlExt}`;
    const httpHeaders = new HttpHeaders(headers);

    const httpParams =
      params instanceof HttpParams
        ? params
        : new HttpParams({fromObject: params});

    return this.http.get<T>(url, {
      headers: httpHeaders,
      params: httpParams
    });
  }

  post<T>(
    urlExt: string,
    body: any,
    params: HttpParams | Record<string, any> = {},
    headers: any = {}
  ): Observable<T> {
    const url = `${this.baseApi}${urlExt}`;
    const httpHeaders = new HttpHeaders(headers);

    const httpParams =
      params instanceof HttpParams
        ? params
        : new HttpParams({fromObject: params});

    return this.http.post<T>(url, body, {
      headers: httpHeaders,
      params: httpParams
    });
  }

  // post(endpoint: string, body: any, headers: any = {}): Observable<any> {
  //   const url = `${this.baseApi}${endpoint}`;
  //   const httpHeaders = new HttpHeaders(headers);
  //   return this.http.post(url, body, {headers: httpHeaders});
  // }

  patch(urlExt: string, body: any = {}, headers: any = {}): Observable<any> {
    const url = `${this.baseApi}${urlExt}`;
    const httpHeaders = new HttpHeaders(headers);

    return this.http.patch(url, body, {headers: httpHeaders});
  }

  // Add other methods like PUT, DELETE as needed
}
