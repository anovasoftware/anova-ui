import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem, MenuService, PageItem} from '../../../services/menu.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './navigator.component.html',
})


export class NavigatorComponent implements OnInit, OnDestroy {
  public componentLoaded = false;
  menuId = '';
  selectedMenu: MenuItem | null = null;
  page: PageItem | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    combineLatest([
      this.route.paramMap,
      this.menuService.menus$
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([params, menus]) => {
      const menuId = params.get('id') ?? '';
      this.menuId = menuId;

      if (menus.length > 0) {
        const menu = menus.find(m => m.menuId === menuId) || null;
        this.selectedMenu = menu;
        this.page = menu?.page ?? null;

        this.menuService.setSelectedMenu(menu);

        if (menu?.page?.pageId) {
          const route = `page${menu.page.pageId}`;
          if (this.routeExistsInConfig(route)) {
            this.router.navigate([`/${route}`]);
            this.componentLoaded = true;
          }
        }
      } else {
        console.warn('Menus not loaded yet');
      }
      // this.componentLoaded = true;
    });
  }


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

  // ngOnInit(): void {
  //   this.route.paramMap
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(params => {
  //       const menuId = params.get('id') ?? '';
  //       const menu = this.menuService.getMenuById(menuId);
  //
  //       this.menuId = menuId;
  //       this.selectedMenu = menu;
  //       this.page = menu?.page ?? null;
  //       this.menuService.setSelectedMenu(menu);
  //
  //       if (menu?.page?.pageId) {
  //         // Navigate to /page001, /page002, etc.
  //         const route = `page${menu.page.pageId}`;
  //         console.log(route);
  //
  //         // const routeExists = this.router.config.some(r => r.path === route);
  //         const routeExists = this.routeExistsInConfig(route);
  //         if (routeExists) {
  //           this.router.navigate([`/${route}`])
  //             .then(success => {
  //               if (success) {
  //                 console.log('Navigation succeeded');
  //               } else {
  //                 console.warn('Navigation failed');
  //               }
  //             })
  //             .catch(err => {
  //               console.error('Navigation error:', err);
  //             });
  //
  //         }
  //       }
  //     });
  // }
