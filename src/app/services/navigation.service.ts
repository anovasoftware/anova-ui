import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';
import { GlobalService } from './global.service';
import { Menu } from '../models/menu';
import { PageConstants } from '../../constants/page_constants';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private recordBreadcrumbSubject = new BehaviorSubject<string>('');
  recordBreadcrumb$ = this.recordBreadcrumbSubject.asObservable();
  constructor(
    private router: Router,
    private menuService: MenuService,
    private globalService: GlobalService
  ) {}

  setRecordBreadcrumb(label: string): void {
    this.recordBreadcrumbSubject.next(label);
  }

  clearRecordBreadcrumb(): void {
    this.recordBreadcrumbSubject.next('');
  }

  navigateToMenu(menu: Menu): void {
    this.globalService.setCurrentMenuId(menu.menuId);
    this.menuService.setSelectedMenu(menu);
    this.clearRecordBreadcrumb();

    if (menu.route) {
      let route = menu.route;

      if (route === 'page' && menu.page?.pageId) {
        route = `/page${menu.page.pageId}`;
      }

      void this.router.navigate([route], {
        queryParams: { gridId: menu.gridId }
      });
      return;
    }

    if (
      menu.page?.pageId &&
      menu.page.pageId !== PageConstants.NOT_APPLICABLE
    ) {
      void this.router.navigate([`/page${menu.page.pageId}`], {
        queryParams: { gridId: menu.gridId }
      });
      return;
    }

    if (this.menuService.hasChildren(menu.menuId)) {
      if (!this.router.url.startsWith('/navigator')) {
        void this.router.navigate(['/navigator']);
      }
      return;
    }
  }
}
