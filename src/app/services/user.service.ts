import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'table/base/user/';

  constructor(
    private api: ApiService,
  ) {}

  setLastHotel(pk: string, lastHotelId: string): Observable<ApiResponse<any>> {
    const url = `${this.baseUrl}`;

    const record = {
      pk: pk,
      last_hotel_id: lastHotelId
    }

    return this.api.patch(url, record);
  }
}
