import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';

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

  constructor(private api: ApiService) {
  }

  loadMenus(): void {
    this.api.get('public/table/static/menu/').subscribe({
      next: (res) => this.menusSubject.next(res?.detail || []),
      error: () => this.menusSubject.next([]),
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
