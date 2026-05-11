import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '../api.service';
import {ApiResponse} from '../../models/api-response';

@Injectable({providedIn: 'root'})
export class GangwayService {
  private dashboardSubject = new BehaviorSubject<any | null>(null);
  dashboard$ = this.dashboardSubject.asObservable();

  constructor(
    private api: ApiService,
  ) {
  }

  loadDashboard(hotelId: string): void {
    this.api.get<ApiResponse<any>>(
      'gangway/dashboard/',
      {hotelId}
    ).subscribe({
      next: (response) => {
        this.dashboardSubject.next(response.data);
      },
      error: () => {
        this.dashboardSubject.next(null);
      },
    });
  }

  get dashboard(): any | null {
    return this.dashboardSubject.getValue();
  }
}
