import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';
import {GlobalService} from './global.service';

export interface PageItem {
  pageId: string;
  description: string;
}

export interface MenuItem {
  menuId: string;
  typeId: string;
  description: string;
  title: string;
  subTitle?: string;
  breadcrumbName: string;
  route: string;
  page?: PageItem;
}

@Injectable({providedIn: 'root'})
export class MenuService {
  private menusSubject = new BehaviorSubject<MenuItem[]>([]);
  menus$ = this.menusSubject.asObservable();

  constructor(
    private api: ApiService,
    private globalService: GlobalService) {
  }

  // loadMenus(): void {
  //   console.log('loading menus');
  //   this.api.get('public/table/static/menu/').subscribe({
  //     next: (res) => this.menusSubject.next(res?.detail || []),
  //     error: () => this.menusSubject.next([]),
  //   });
  // }
  loadMenus(): void {
    console.log('loading menus');
    this.api.get('public/table/static/menu/').subscribe({
      next: (res) => {
       const menus: MenuItem[] = res?.detail || [];
        this.menusSubject.next(menus);

        // ✅ Set selectedMenu if it's empty
        if (!this.selectedMenuSubject.value && menus.length > 0) {
          const defaultMenu = menus.find(m => m.menuId === '001') || menus[0];
          this.selectedMenuSubject.next(defaultMenu);
          this.globalService.setMeta(res.meta);
        }
      },
      error: () => {
        this.menusSubject.next([]);
        this.selectedMenuSubject.next(null);
      },
    });
}

  getMenusByType(typeId: string): MenuItem[] {
    return this.menusSubject.getValue().filter(m => m.typeId === typeId);
  }

  getMenuById(menuId: string): MenuItem | null {
    return this.menusSubject.getValue().find(m => m.menuId === menuId) ?? null;
  }

  private selectedMenuSubject = new BehaviorSubject<MenuItem | null>(null);
  selectedMenu$ = this.selectedMenuSubject.asObservable();

  setSelectedMenu(menu: MenuItem | null): void {
    this.selectedMenuSubject.next(menu);
  }

  getSelectedMenu(): MenuItem | null {
    return this.selectedMenuSubject.getValue();
  }
}
