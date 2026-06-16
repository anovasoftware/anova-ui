import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Form} from '../models/form';
import {ApiResponse, FormResponse} from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private baseUrl = 'form/';

  constructor(private api: ApiService) {
  }

  loadForm(formId: string, recordId: string, action: string, params: any): Observable<FormResponse> {
    const url = this.getUrl(formId, action, recordId, params);
    return this.api.get<FormResponse>(url);
  }

  submitForm(formId: string, recordId: string, formData: any): Observable<any> {
    const url = this.getUrl(formId, recordId)
    return this.api.post(url, formData);
  }

  getUrl(formId: string, recordId?: string | null, action?: string | null, params?: any): string {

    const searchParams = new URLSearchParams();
    // let url = `${this.baseUrl}${formId}`;

    if (recordId) {
      searchParams.set('recordId', recordId);
    }

    if (action) {
      searchParams.set('action', action);
    }
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.set(key, String(value));
        }
      });
    }
    return `${this.baseUrl}${formId}?${searchParams.toString()}`;
  }
}


