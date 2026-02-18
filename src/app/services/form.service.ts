import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Form} from '../models/form';
import {ApiResponse, FormResponse} from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private baseUrl = 'form/form_data/';

  constructor(private api: ApiService) {
  }

  loadForm(formId: string, recordId: string, action: string): Observable<FormResponse> {
    const url = this.getUrl(formId, action, recordId);
    return this.api.get<FormResponse>(url);
  }

  submitForm(formId: string, formData: any): Observable<any> {
    const url = this.getUrl(formId, null)
    return this.api.post(url, formData);
  }

  getUrl(formId: string, recordId?: string | null, action?: string | null,): string {
    let url = `${this.baseUrl}${formId}`;

    url += '?dummy=dummy';

    if (recordId) {
      url += `&recordId=${encodeURIComponent(recordId)}`;
    }
    if (action) {
      url += `&action=${encodeURIComponent(action)}`;
    }
    return url;
  }
}


