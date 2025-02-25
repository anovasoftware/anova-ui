import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:8000/test-api?param1=yoyo';

  constructor(private http: HttpClient) {}

  // ✅ Call Django API
  getTestMessage(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
