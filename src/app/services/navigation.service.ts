import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from './menu.service';
import {GlobalService} from './global.service';
import {Menu} from '../models/menu';
import {PageConstants} from '../../constants/page_constants';
import {BehaviorSubject} from 'rxjs';
import {MenuConstants} from '../../constants/menu_constants';

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
  ) {
  }

  setRecordBreadcrumb(label: string): void {
    this.recordBreadcrumbSubject.next(label);
  }

  clearRecordBreadcrumb(): void {
    this.recordBreadcrumbSubject.next('');
  }

  navigateToMenu(menu: Menu): void {
    this.menuService.setSelectedMenu(menu);
    this.clearRecordBreadcrumb();

    const queryParams = {
      gridId: menu.gridId,
      ...(menu.params ?? {})
    };

    let route: string | null = null;

    if (menu.route) {
      route = menu.route;

      if (route === 'page' && menu.page?.pageId) {
        route = `/page${menu.page.pageId}`;
        this.globalService.setCurrentPageId(menu.page.pageId);
      }
    } else if (
      menu.page?.pageId &&
      menu.page.pageId !== PageConstants.NOT_APPLICABLE
    ) {
      route = `/page${menu.page.pageId}`;
      this.globalService.setCurrentPageId(menu.page.pageId);
    } else if (this.menuService.hasChildren(menu.menuId)) {
      route = '/navigator';
      // route = `/navigator/${menu.menuId}`;
    }

    if (route) {
      this.globalService.setCurrentMenuId(menu.menuId);

      const breadcrumbItem = {
        label: menu.breadcrumbName || menu.description,
        commands: [route],
        queryParams,
        menuId: menu.menuId,
      };

      if (menu.parentMenuId && menu.parentMenuId !== MenuConstants.NOT_APPLICABLE) {
        this.globalService.pushBreadcrumb(breadcrumbItem);
      } else {
        this.globalService.setBreadcrumbs([breadcrumbItem]);
      }
      // console.log(queryParams);
      void this.router.navigate([route], {queryParams});
    }
  }
}
