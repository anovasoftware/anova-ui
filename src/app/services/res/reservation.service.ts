import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ApiService} from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private api: ApiService,
    private http: HttpClient
  ) {
  }

  calculatePricing(body: any, params: HttpParams ): Observable<any> {
    return this.api.post('reservation/pricing/',
      body,
      params
    );

  }
}
