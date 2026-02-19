// src/app/services/global.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import {AuthService} from './auth.service';
import {Meta} from '../models/meta';
import {User} from '../models/user';
import {ApiMeta} from '../models/api-response';
import {normalizeUser} from '../core/utilities/common';
export interface GlobalState {
  meta: Meta,
  user: User | null
}

@Injectable({ providedIn: 'root' })
export class GlobalService {
  private globalSubject = new BehaviorSubject<GlobalState>({
    meta: {version: 'TBA', databaseKey: 'TBA'},
    user: null,
    // user: {
    //   userId: 'new',
    //   username: '',
    //   person: null,
    //   loggedIn: false,
    //   name: 'Guest',
    // },
  });
  user$ = this.globalSubject.asObservable();

  constructor(
    private api: ApiService,
    private authService: AuthService) {
      this.authService.user$.subscribe(user => {
        console.log('GlobalService saw authService.user$ =', user);
        this.updateUserState(user);
      });
  }
  loadGlobalState(): void {
    // No-op or not implemented
  }

  private updateUserState(user: any): void {
    const current = this.globalSubject.value;
    const normalized = normalizeUser(user);

      this.globalSubject.next({
        meta: current.meta,
        user: normalized
        // user: user ?? null
      });
  }
  setMeta(meta: ApiMeta): void {
    const current = this.globalSubject.value;
    this.globalSubject.next({
      meta: meta ?? {},
      user: current.user
    });
  }

}
