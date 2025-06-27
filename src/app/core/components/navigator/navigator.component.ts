import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem, MenuService, PageItem} from '../../../services/menu.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-navigator',
  standalone: true,
  templateUrl: './navigator.component.html',
})

export class NavigatorComponent implements OnInit, OnDestroy {
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
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const menuId = params.get('id') ?? '';
        const menu = this.menuService.getMenuById(menuId);
        this.selectedMenu = menu;
        this.page = menu?.page ?? null;
        this.menuService.setSelectedMenu(menu);

        if (menu?.page?.pageId) {
          // Navigate to /page001, /page002, etc.
          const route = `page${menu.page.pageId}`;
          console.log(route);

          // const routeExists = this.router.config.some(r => r.path === route);
          const routeExists = this.routeExistsInConfig(route);
          if (routeExists) {
            this.router.navigate([`/${route}`])
              .then(success => {
                if (success) {
                  console.log('Navigation succeeded');
                } else {
                  console.warn('Navigation failed');
                }
              })
              .catch(err => {
                console.error('Navigation error:', err);
              });

          }
        }
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


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import {MenuItem, MenuService} from '../../../services/menu.service';
//
// @Component({
//   selector: 'app-navigator',
//   templateUrl: './navigator.component.html',
// })
// export class NavigatorComponent implements OnInit {
//   menuId: string = '';
//   headerMenu: MenuItem[] = [];
//
//   constructor(
//     private route: ActivatedRoute,
//     private menuService: MenuService
//   ) {}
//
//   ngOnInit() {
//     this.route.paramMap.subscribe(params => {
//       this.menuId = params.get('id') ?? '';
//       this.loadContent();
//     });
//   }
//
//   loadContent() {
//     this.menuService.menuList$.subscribe(menu => this.headerMenu = menu);
//     this.menuService.getMenu(this.menuId);
//     // this.menuService.loadMenu('', this.menuId);
//     // switch (this.menuId) {
//     //   case '000':
//     //     this.content = 'Welcome to Anova!';
//     //     break;
//     //   case '001':
//     //     this.content = 'About Us';
//     //     break;
//     //   case '002':
//     //     this.content = 'Modules Overview';
//     //     break;
//     //   default:
//     //     this.content = 'Page not found.';
//     // }
//   }}


// ngOnInit() {
//   this.menuService.menus$
//     .pipe(takeUntil(this.destroy$))
//     .subscribe(menu => {
//       this.headerMenu = menu;
//       this.selectedMenu = menu.length > 0 ? menu[0] : null;
//     });
//
//   this.route.paramMap
//     .pipe(takeUntil(this.destroy$))
//     .subscribe(params => {
//       this.menuId = params.get('id') ?? '';
//       this.menuService.loadMenu('', this.menuId);  // just call loadMenu
//     });
// }
