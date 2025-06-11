// src/app/services/global.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface GlobalState {
  meta: {
    version: string;
    databaseKey: string;
  },
  user: {
    name: string;
    loggedIn: boolean;
  };
}


@Injectable({ providedIn: 'root' })
export class GlobalService {
  private globalSubject = new BehaviorSubject<GlobalState>({
    meta: {version: 'TBA', databaseKey: 'TBA'},
    user: {name: 'Guest', loggedIn: false},
  });
  user$ = this.globalSubject.asObservable();

  constructor(private api: ApiService) {
  }

  loadGlobalState(): void {
    this.api.get('public/table/base/user').subscribe({
      next: (res) => {
        const user = res?.header?.user;
        const version = res?.meta?.version ?? '';
        const databaseKey = res?.meta?.databaseKey ?? '';

        this.globalSubject.next({
          meta: {
            version,
            databaseKey
          },
          user: {
            name: user?.name ?? 'Guest',
            loggedIn: user?.loggedIn ?? false
          },
        });
      },
      error: () => {
        this.globalSubject.next({
          meta: {
            version: '',
            databaseKey: ''
          },
          user: {name: 'Guest', loggedIn: false},
        });
      }
    });
  }
}
