import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {ApiService} from './api.service';
import {GlobalService} from './global.service';
import {Menu} from '../models/menu';
import {ApiData, ApiResponse} from '../models/api-response';
import {MenuConstants} from '../../constants/menu_constants';
import {TypeConstants} from '../../constants/type_constants';
import {HotelConstants} from '../../constants/hotel_constants';


@Injectable({providedIn: 'root'})
export class MenuService {
  protected readonly TypeConstants = TypeConstants;
  private menusSubject = new BehaviorSubject<Menu[]>([]);
  menus$ = this.menusSubject.asObservable();
  private selectedMenuSubject = new BehaviorSubject<Menu | null>(null);
  selectedMenu$ = this.selectedMenuSubject.asObservable();
  private childrenMap: { [key: string]: Menu[] } = {};  // TODO: add this later

  breadcrumbMenus$!: Observable<Menu[]>;

  constructor(
    private api: ApiService,
    private globalService: GlobalService
  ) {
    this.breadcrumbMenus$ = combineLatest([
      this.menus$,
      this.globalService.currentMenuId$
    ]).pipe(
      map(([menus, currentMenuId]) =>
        menus.length && currentMenuId
          ? this.buildMenuPath(menus, currentMenuId)
          : []
      )
    );
    this.globalService.currentHotel$.subscribe(hotel => {
        if (hotel) {
          this.loadMenus(hotel.typeId);
        } else {
          this.menusSubject.next([]);
          this.selectedMenuSubject.next(null);
        }
      });
  }

  loadMenus(hotelTypeId: string | null = null): void {
    this.api.get<ApiResponse<ApiData<Menu>>>('public/table/static/menu/').subscribe({
      next: (response) => {
        let menus: Menu[] = response?.data.records || [];

        menus = menus.filter(menu =>
          menu.hotelTypeId === '000' ||
          menu.hotelTypeId === hotelTypeId
        );
        this.menusSubject.next(menus);

        if (!this.selectedMenuSubject.value && menus.length > 0) {
          const defaultMenu = menus.find(m => m.menuId === MenuConstants.HOME) || menus[0];
          this.selectedMenuSubject.next(defaultMenu);
          this.globalService.setMeta(response.meta);
        }
      },
      error: () => {
        this.menusSubject.next([]);
        this.selectedMenuSubject.next(null);
      },
    });
  }

  hasChildren(menuId: string): boolean {
    return this.menusSubject
      .getValue()
      .some(m => m.parentMenuId === menuId);
  }

  getMenusByType(typeId: string): Menu[] {
    return this.menusSubject.getValue().filter(m => m.typeId === typeId);
  }

  getMenuById(menuId: string): Menu | null {
    return this.menusSubject.getValue().find(m => m.menuId === menuId) ?? null;
  }

  setSelectedMenu(menu: Menu | null): void {
    this.selectedMenuSubject.next(menu);
  }

  getSelectedMenu(): Menu | null {
    return this.selectedMenuSubject.getValue();
  }

  getMenuPath(menuId: string): Menu[] {
    return this.buildMenuPath(this.menusSubject.getValue(), menuId);
  }

  private buildMenuPath(menus: Menu[], menuId: string): Menu[] {
    let path: Menu[] = [];
    let currentMenu = menus.find(m => m.menuId === menuId) ?? null;
    let guard = 0;

    while (currentMenu && guard < 20) {
      path.unshift(currentMenu);

      const parentMenuId = currentMenu.parentMenuId;
      if (currentMenu.menuId === MenuConstants.HOME) {
        break;
      }

      currentMenu = menus.find(m => m.menuId === parentMenuId) ?? null;
      guard++;
    }
    // if (path.length === 1) {
    //   path = [];
    // }

    return path;
  }

  hasMenuAccess(menuId: string): boolean {
    let hasAccess = false;
    const user = this.globalService.currentUser;
    if (user) {
      hasAccess = user.menus?.some(m => m.menuId === menuId) ?? false;
    }
    return hasAccess;
  }

  getCurrentNavigationMenus(): Observable<Menu[]> {
    return combineLatest([
      this.menus$,
      this.globalService.currentMenuId$,
      this.globalService.currentHotelId$,
      this.globalService.user$,
    ]).pipe(
      map(([menus, currentMenuId, currentHotelId, user]) => {
        const allowedMenuIds = new Set(user?.menus?.map(m => m.menuId) ?? []);
        const hotelSelected = this.globalService.currentHotelId != HotelConstants.NOT_APPLICABLE;

        return menus
          .filter(m => {
            const isNavigationMenu = (m.typeId === this.TypeConstants.MENU_NAVIGATION);
            const isChildOfCurrentMenu = (m.parentMenuId === currentMenuId);
            const hotelRequirementMet = (!m.hotelRequired || hotelSelected);

            return isNavigationMenu && isChildOfCurrentMenu && hotelRequirementMet;
          })
          .map(m => {
            const hasAccess = !!user?.isSuperuser || allowedMenuIds.has(m.menuId);

            return {
              ...m,
              disabled: !hasAccess
            };
          });
      })
    );
  }

  getChildren(menuId: string): Menu[] {
    return this.menusSubject.getValue().filter(m => m.parentMenuId === menuId);
  }

  getHeaderMenus(): Menu[] {
    return this.menusSubject.getValue().filter(
      m => m.parentMenuId === MenuConstants.NOT_APPLICABLE && m.typeId === this.TypeConstants.MENU_HEADER_BAR
    );
  }
}

