// src/app/services/global.service.ts

import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  Observable
} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {ApiService} from './api.service';
import {AuthService} from './auth.service';

import {Meta} from '../models/meta';
import {User} from '../models/user';
import {ApiMeta} from '../models/api-response';
import {Hotel} from '../models/hotel';
import {Client} from '../models/client';

import {normalizeUser} from '../core/utilities/common';

import {MenuConstants} from '../../constants/menu_constants';
import {HotelConstants} from '../../constants/hotel_constants';
import {ClientConstants} from '../../constants/client_constants';
import {PageConstants} from '../../constants/page_constants';

export interface GlobalState {
  meta: Meta;
  user: User | null;
}

export interface BreadcrumbItem {
  label: string;
  commands?: any[];
  queryParams?: Record<string, any>;
  menuId: string;
}

@Injectable({providedIn: 'root'})
export class GlobalService {
  protected readonly MenuConstants = MenuConstants;

  private globalSubject = new BehaviorSubject<GlobalState>({
    meta: {
      version: 'TBA',
      databaseKey: 'TBA'
    },
    user: null
  });

  global$ = this.globalSubject.asObservable();

  user$ = this.global$.pipe(
    map(state => state.user),
    distinctUntilChanged()
  );

  /*
   * Current hotel ID remains its own state because the user can select
   * another hotel before the refreshed user profile is returned.
   */
  private currentHotelIdSubject: BehaviorSubject<string>;
  currentHotelId$: Observable<string>;

  /*
   * The detailed current hotel now comes directly from the user profile.
   */
  currentHotel$: Observable<Hotel | null>;

  /*
   * The detailed current client also comes directly from the user profile.
   */
  currentClient$: Observable<Client | null>;

  private currentMenuIdSubject: BehaviorSubject<string>;
  currentMenuId$: Observable<string>;

  private currentPageIdSubject: BehaviorSubject<string>;
  currentPageId$: Observable<string>;

  private breadcrumbsSubject =
    new BehaviorSubject<BreadcrumbItem[]>([]);

  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor(
    private api: ApiService,
    private authService: AuthService
  ) {
    const initialMenuId = this.authService.getCurrentMenuId() || MenuConstants.HOME;
    const initialHotelId = this.authService.getCurrentHotelId() || HotelConstants.NOT_APPLICABLE;
    this.currentMenuIdSubject = new BehaviorSubject<string>(initialMenuId);
    // this.currentHotelIdSubject = new BehaviorSubject<string>(initialHotelId);
    this.currentHotelIdSubject = new BehaviorSubject<string>(
      this.authService.getCurrentHotelId()
    );


    this.currentMenuId$ = this.currentMenuIdSubject.asObservable();
    this.currentHotelId$ = this.currentHotelIdSubject.asObservable();
    this.currentPageIdSubject = new BehaviorSubject<string>(PageConstants.NOT_APPLICABLE);
    // this.currentPageId$ = this.currentPageIdSubject.asObservable();
    this.currentPageId$ = this.currentPageIdSubject.asObservable().pipe(
      // tap(pageId => console.log('currentPageId$ emitted:', pageId))
    );

    this.currentHotel$ = this.user$.pipe(
      map(user => user?.currentHotel ?? null),
      distinctUntilChanged(
        (previous, current) =>
          previous?.hotelId === current?.hotelId
      )
    );

    this.currentClient$ = this.user$.pipe(
      map(user => user?.currentClient ?? null),
      distinctUntilChanged(
        (previous, current) =>
          previous?.clientId === current?.clientId
      )
    );

    this.authService.user$.subscribe(user => {
      this.updateUserState(user);

      if (!user) {
        console.log('navigating to home menu');
        this.setCurrentMenuId(MenuConstants.HOME);
        this.setCurrentHotelId(
          HotelConstants.NOT_APPLICABLE
        );
        return;
      }

      /*
       * currentHotel is now more authoritative than lastHotelId.
       * lastHotelId can remain as a fallback during migration.
       */
      const hotelId =
        user.currentHotel?.hotelId ||
        user.lastHotelId ||
        HotelConstants.NOT_APPLICABLE;

      this.setCurrentHotelId(hotelId);
    });
  }

  loadGlobalState(): void {
    // No-op or not implemented
  }

  private updateUserState(user: User | null): void {
    const current = this.globalSubject.value;

    const normalized = user
      ? normalizeUser(user)
      : null;

    this.globalSubject.next({
      ...current,
      user: normalized
    });
  }

  setMeta(meta: ApiMeta): void {
    const current = this.globalSubject.value;

    this.globalSubject.next({
      ...current,
      meta: meta ?? current.meta
    });
  }

  get currentUser(): User | null {
    return this.globalSubject.value.user;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser?.isLoggedIn;
  }

  get currentHotel(): Hotel | null {
    return this.currentUser?.currentHotel ?? null;
  }

  // get currentHotelId(): string {
  //   const hotelId = (
  //     this.currentHotelIdSubject.value ||
  //     this.currentHotel?.hotelId ||
  //     HotelConstants.NOT_APPLICABLE
  //   );
  //   console.log('currentHotelId', hotelId);
  //   return hotelId;
  // }
  get currentHotelId(): string {
    return this.currentHotelIdSubject.value;
  }

  get currentClient(): Client | null {
    return this.currentUser?.currentClient ?? null;
  }

  get currentClientId(): string {
    return (
      this.currentClient?.clientId ||
      ClientConstants.NOT_APPLICABLE
    );
  }

  get currentMenuId(): string {
    return (
      this.currentMenuIdSubject.value ||
      MenuConstants.HOME
    );
  }

  setCurrentHotelId(hotelId: string): void {
    const value = hotelId || HotelConstants.NOT_APPLICABLE;


    if (this.currentHotelIdSubject.value === value) {
      return;
    }
    this.authService.setCurrentHotelId(value);

    if (this.currentHotelIdSubject.value !== value) {
      this.currentHotelIdSubject.next(value);
    }
  }

  setCurrentMenuId(menuId: string): void {
    const value = menuId || MenuConstants.HOME;

    queueMicrotask(() => {
      if (this.currentMenuIdSubject.value !== value) {
        this.currentMenuIdSubject.next(value);
        this.authService.setCurrentMenuId(value);
      }

      if (value === MenuConstants.HOME) {
        this.setBreadcrumbs([
          {
            label: 'Home',
            commands: ['/navigator'],
            menuId: MenuConstants.HOME
          }
        ]);
      }
    });
  }

  setCurrentPageId(pageId: string): void {
    // console.log('setCurrentPageId called:', pageId);
    this.currentPageIdSubject.next(pageId);
  }

  get currentPageId(): string {
    return this.currentPageIdSubject.value;
  }

  setBreadcrumbs(items: BreadcrumbItem[]): void {
    this.breadcrumbsSubject.next(items);
  }

  pushBreadcrumb(item: BreadcrumbItem): void {
    this.breadcrumbsSubject.next([
      ...this.breadcrumbsSubject.value,
      item
    ]);
  }

  clearBreadcrumbs(): void {
    this.breadcrumbsSubject.next([]);
  }

  trimBreadcrumbsAt(index: number): void {
    const current = this.breadcrumbsSubject.value;

    this.breadcrumbsSubject.next(
      current.slice(0, index + 1)
    );
  }
}

