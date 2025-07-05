import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Form} from '../models/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private api: ApiService) {}

  // xloadForm(formId: string): Observable<Form> {
  //   const url = `form/form_data/${formId}`; // `${this.baseUrl}${formId}/`;
  //   return this.api.get(url);
  // }
  loadForm(formId: string): Observable<FormResponse> {
    const url = `form/form_data/${formId}`; // `${this.baseUrl}${formId}/`;
    return this.api.get(url);
  }
}


export interface FormResponse {
  form: Form;
}
