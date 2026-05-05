// src/app/services/global.service.ts
import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, distinctUntilChanged, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {Meta} from '../models/meta';
import {User} from '../models/user';
import {ApiMeta} from '../models/api-response';
import {normalizeUser} from '../core/utilities/common';
import {MenuConstants} from '../../constants/menu_constants';
import {HotelConstants} from '../../constants/hotel_constants';

export interface GlobalState {
  meta: Meta;
  user: User | null;
}

@Injectable({providedIn: 'root'})
export class GlobalService {
  protected readonly MenuConstants = MenuConstants;
  private globalSubject = new BehaviorSubject<GlobalState>({
    meta: {version: 'TBA', databaseKey: 'TBA'},
    user: null,
  });

  global$ = this.globalSubject.asObservable();
  user$ = this.global$.pipe(map(state => state.user));

  private currentHotelIdSubject: BehaviorSubject<string>;
  currentHotelId$: Observable<string>;
  currentHotel$: Observable<any | null>;

  private currentMenuIdSubject: BehaviorSubject<string>;
  currentMenuId$: Observable<string>;

  // isLoggedIn$ = this.global$.pipe(map(state => !!state.user));

  constructor(
    private api: ApiService,
    private authService: AuthService
  ) {
    const initialMenuId = this.authService.getCurrentMenuId() || MenuConstants.HOME;
    const initialHotelId = this.authService.getCurrentHotelId() || HotelConstants.NOT_APPLICABLE;
    this.currentMenuIdSubject = new BehaviorSubject<string>(initialMenuId);
    this.currentHotelIdSubject = new BehaviorSubject<string>(initialHotelId);

    this.currentMenuId$ = this.currentMenuIdSubject.asObservable();
    this.currentHotelId$ = this.currentHotelIdSubject.asObservable();

    this.currentHotel$ = combineLatest([
      this.currentHotelId$,
      this.user$
    ]).pipe(
      map(([hotelId, user]) =>
        user?.hotels?.find(hotel => hotel.hotelId === hotelId) ?? null
      ),
      distinctUntilChanged((a, b) => a?.hotelId === b?.hotelId)
    );
    this.authService.user$.subscribe(user => {
      this.updateUserState(user);
      if (!user) {
        this.setCurrentMenuId(MenuConstants.HOME);
        this.setCurrentHotelId(HotelConstants.NOT_APPLICABLE);
      } else {
        const hotelId = user.lastHotelId || HotelConstants.NOT_APPLICABLE;
        this.setCurrentHotelId(hotelId);
      }
    });
    // const initialMenuId = this.authService.getCurrentMenuId();
    // const initialHotelId = this.authService.getCurrentHotelId();
    //
    // this.currentMenuIdSubject = new BehaviorSubject<string | null>(initialMenuId);
    // this.currentMenuId$ = this.currentMenuIdSubject.asObservable();
    // this.currentHotelIdSubject = new BehaviorSubject<string | null>(initialHotelId);
    // this.currentHotelId$ = this.currentHotelIdSubject.asObservable();

    // this.authService.user$.subscribe(user => {
    //   this.updateUserState(user);
    //
    //   if (user) {
    //     this.setCurrentMenuId(MenuConstants.HOME);
    //     this.setCurrentHotelId(user.lastHotelId);
    //   }
    // });
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

  get currentUser(): User | null {
    return this.globalSubject.value.user;
  }

  get isLoggedIn(): boolean {
    return !!this.globalSubject.value.user;
  }

  get currentHotelId(): string {
    return this.currentHotelIdSubject.value || HotelConstants.NOT_APPLICABLE;
  }

  get currentMenuId(): string {
    return this.currentMenuIdSubject.value || MenuConstants.HOME;
  }

  setCurrentHotelId(hotelId: string): void {
    const value = hotelId || HotelConstants.NOT_APPLICABLE;
    this.currentHotelIdSubject.next(value);
    this.authService.setCurrentHotelId(value);
  }

  setCurrentMenuId(menuId: string): void {
    const value = menuId || MenuConstants.HOME;
    this.currentMenuIdSubject.next(value);
    this.authService.setCurrentMenuId(value);
  }
}
