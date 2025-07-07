import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Form} from '../models/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private baseUrl = 'form/form_data/';

  constructor(private api: ApiService) {}

  loadForm(formId: string): Observable<FormResponse> {
    const url = this.getUrl(formId)
    return this.api.get(url);
  }
  submitForm(formId: string, formData: any): Observable<any> {
    const url = this.getUrl(formId)
    return this.api.post(url, formData);
  }

  getUrl(formId: string): string {
    return `${this.baseUrl}${formId}`;
  }
}


export interface FormResponse {
  form: Form;
}
