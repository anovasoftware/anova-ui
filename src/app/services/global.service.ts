// src/app/services/global.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Meta } from '../models/meta';
import { User } from '../models/user';
import { ApiMeta } from '../models/api-response';
import { normalizeUser } from '../core/utilities/common';
import {MenuConstants} from '../../constants/menu_constants';

export interface GlobalState {
  meta: Meta;
  user: User | null;
}

@Injectable({ providedIn: 'root' })
export class GlobalService {
  protected readonly MenuConstants = MenuConstants;
  private globalSubject = new BehaviorSubject<GlobalState>({
    meta: { version: 'TBA', databaseKey: 'TBA' },
    user: null,
  });

  private currentMenuIdSubject: BehaviorSubject<string | null>;


  global$ = this.globalSubject.asObservable();
  user$ = this.global$.pipe(map(state => state.user));
  isLoggedIn$ = this.global$.pipe(map(state => !!state.user));
  currentMenuId$: Observable<string | null>;

  constructor(
    private api: ApiService,
    private authService: AuthService
  ) {
    const initialMenuId = this.authService.getCurrentMenuId();
    this.currentMenuIdSubject = new BehaviorSubject<string | null>(initialMenuId);
    this.currentMenuId$ = this.currentMenuIdSubject.asObservable();

    this.authService.user$.subscribe(user => {
      this.updateUserState(user);

      if (user) {
        this.setCurrentMenuId(MenuConstants.HOME);
      }
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
    });
  }

  setMeta(meta: ApiMeta): void {
    const current = this.globalSubject.value;
    this.globalSubject.next({
      meta: meta ?? current.meta,
      user: current.user
    });
  }

  get isLoggedIn(): boolean {
    return !!this.globalSubject.value.user;
  }

  get currentMenuId(): string {
    let menuId = this.currentMenuIdSubject.value;
    if (!menuId) {
      menuId = '000';
    }
    return menuId;
    // return this.currentMenuIdSubject.value;
  }

  setCurrentMenuId(menuId: string): void {
    this.currentMenuIdSubject.next(menuId);
    this.authService.setCurrentMenuId(menuId);
  }
}



