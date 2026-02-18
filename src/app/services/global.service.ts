// src/app/services/global.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import {AuthService} from './auth.service';
import {Meta} from '../models/meta';
import {User} from '../models/user';
import {ApiMeta} from '../models/api-response';

export interface GlobalState {
  meta: Meta,
  user: User | null
}

@Injectable({ providedIn: 'root' })
export class GlobalService {
  private globalSubject = new BehaviorSubject<GlobalState>({
    meta: {version: 'TBA', databaseKey: 'TBA'},
    user: {
      userId: 'new',
      username: '',
      person: null,
      loggedIn: false,
      name: 'Guest',
    },
  });
  user$ = this.globalSubject.asObservable();

  constructor(
    private api: ApiService,
    private authService: AuthService) {
      this.authService.user$.subscribe(user => {
        this.updateUserState(user);
      });
  }
  loadGlobalState(): void {
    // No-op or not implemented
  }

  // loadGlobalState(): void {
  //   this.api.get('public/table/base/user').subscribe({
  //     next: (res) => {
  //       const user = res?.header?.user;
  //       const version = res?.meta?.version ?? '';
  //       const databaseKey = res?.meta?.databaseKey ?? '';
  //
  //       this.globalSubject.next({
  //         meta: {
  //           version,
  //           databaseKey
  //         },
  //         user: {
  //           name: user?.name ?? 'Guest',
  //           loggedIn: user?.loggedIn ?? false
  //         },
  //       });
  //     },
  //     error: () => {
  //       this.globalSubject.next({
  //         meta: {
  //           version: '',
  //           databaseKey: ''
  //         },
  //         user: {name: 'Guest', loggedIn: false},
  //       });
  //     }
  //   });
  // }
  private updateUserState(user: any): void {
    const current = this.globalSubject.value;
      this.globalSubject.next({
        meta: current.meta,
        user: user ?? null
      });
    // this.globalSubject.next({
    //   meta: current.meta,
    //   user: {
    //     name: user?.first_name ?? user?.username ?? 'Guest',
    //     loggedIn: !!user,
    //     personId: user?.person?.person_id ?? 'new'
    //   }
    // });
  }
  setMeta(meta: ApiMeta): void {
    const current = this.globalSubject.value;
    this.globalSubject.next({
      meta: meta ?? {},
      user: current.user
    });
  }

}
