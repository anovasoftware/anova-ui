import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from '../../../services/menu.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {CommonModule} from '@angular/common';
import {Menu, PageItem} from '../../../models/menu';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navigator.component.html',
})


export class NavigatorComponent implements OnInit, OnDestroy {
  public componentLoaded = false;
  menuId = '';
  selectedMenu: Menu | null = null;
  page: PageItem | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private router: Router,
    private globalService: GlobalService,
  ) {
  }

  private menuReloadRequested = false;

  ngOnInit(): void {
    combineLatest([
      this.route.paramMap,
      this.menuService.menus$
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([params, menus]) => {
        const menuId = params.get('id') ?? '';
        this.menuId = menuId;

        if (!menus || menus.length === 0) {
          if (!this.menuReloadRequested) {
            this.menuReloadRequested = true;
            this.menuService.loadMenus(); // or whatever your method is called
          }
          return;
        }

        this.menuReloadRequested = false;

        const menu = menus.find(m => m.menuId === menuId) || null;

        this.selectedMenu = menu;
        this.page = menu?.page ?? null;

        this.menuService.setSelectedMenu(menu);

        if (menu?.page?.pageId) {
          const route = `page${menu.page.pageId}`;

          if (this.routeExistsInConfig(route)) {
            this.router.navigate([`/${route}`]);
            this.globalService.setCurrentPageId(menu.page.pageId);
            this.componentLoaded = true;
          }
        }
      });
  }

  // ngOnInit(): void {
  //   combineLatest([
  //     this.route.paramMap,
  //     this.menuService.menus$
  //   ])
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(([params, menus]) => {
  //       const menuId = params.get('id') ?? '';
  //
  //       this.menuId = menuId;
  //
  //       if (!menus || menus.length === 0) {
  //         return;
  //       }
  //
  //       // if (!menus || menus.length === 0) {
  //       //   if (!this.menuReloadRequested) {
  //       //     this.menuReloadRequested = true;
  //       //     this.menuService.loadMenus();
  //       //   }
  //       //
  //       //   return;
  //       // }
  //
  //       this.menuReloadRequested = false;
  //       const menu =  menus.find(item => item.menuId === menuId) ?? null;
  //
  //       this.selectedMenu = menu;
  //       this.page = menu?.page ?? null;
  //
  //       this.globalService.setCurrentMenuId(menuId);
  //       this.menuService.setSelectedMenu(menu);
  //
  //       const pageId = menu?.page?.pageId;
  //
  //       if (!pageId) {
  //         this.componentLoaded = true;
  //         return;
  //       }
  //
  //       const pageRoute = `page${pageId}`;
  //
  //       // console.log('Navigator menuId:', menuId);
  //       // console.log('Navigator pageId:', pageId);
  //       // console.log('Navigator pageRoute:', pageRoute);
  //
  //       if (!this.routeExistsInConfig(pageRoute)) {
  //         console.warn(`Route does not exist: ${pageRoute}`);
  //         this.componentLoaded = true;
  //         return;
  //       }
  //
  //       /*
  //        * Set the page ID before navigating because navigation destroys
  //        * the NavigatorComponent.
  //        */
  //       this.globalService.setCurrentPageId(pageId);
  //       this.componentLoaded = true;
  //
  //       this.router.navigate([`/${pageRoute}`]);
  //     });
  // }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private routeExistsInConfig(path: string, routes = this.router.config): boolean {
    for (const route of routes) {
      if (route.path === path) {
        return true;
      }
      if (route.children && this.routeExistsInConfig(path, route.children)) {
        return true;
      }
    }
    return false;
  }


}

