import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {GlobalService} from '../../../services/global.service';
import {MenuService} from '../../../services/menu.service';
import {Menu} from '../../../models/menu';
import {PageConstants} from '../../../../constants/page_constants';
import {NavigationService} from '../../../services/navigation.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  protected readonly PageConstants = PageConstants;

  navigationMode = false;
  breadcrumbMenus: Menu[] = [];
  recordBreadcrumb = '';

  private destroy$ = new Subject<void>();

  constructor(
    private globalService: GlobalService,
    protected menuService: MenuService,
    protected navigationService: NavigationService
  ) {
  }

  ngOnInit(): void {
    this.menuService.breadcrumbMenus$
      .pipe(takeUntil(this.destroy$))
      .subscribe(menus => {
        this.breadcrumbMenus = menus;
        this.navigationMode = this.globalService.isLoggedIn && menus.length > 0;
      });

    this.navigationService.recordBreadcrumb$
      .pipe(takeUntil(this.destroy$))
      .subscribe(label => {
        this.recordBreadcrumb = label || '';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  breadcrumbClick(event: Event, menuId: string): void {
    event.preventDefault();

    const menu = this.menuService.getMenuById(menuId);

    if (!menu || menu.disabled) {
      return;
    }

    this.navigationService.navigateToMenu(menu);
  }

  isClickable(menu: Menu, last: boolean): boolean {
    return !last || !!this.recordBreadcrumb;
  }
}

// import {Component, OnInit} from '@angular/core';
// import {CommonModule} from '@angular/common';
// import {takeUntil} from 'rxjs/operators';
// import {GlobalService} from '../../../services/global.service';
// import {MenuService} from '../../../services/menu.service';
// import {AuthService} from '../../../services/auth.service';
// import {UserService} from '../../../services/user.service';
// import {Router} from '@angular/router';
// import {MatDialog} from '@angular/material/dialog';
// import {FormDialogService} from '../../../services/form-dialog.service';
// import {Subject} from 'rxjs';
// import {Menu} from '../../../models/menu';
// import {PageConstants} from '../../../../constants/page_constants';
// import {NavigationService} from '../../../services/navigation.service';
//
// @Component({
//   selector: 'app-breadcrumb',
//   standalone: true,  // ✅ Mark it as a standalone component
//   imports: [CommonModule],  // ✅ Import required modules
//   templateUrl: './breadcrumb.component.html',
//   styleUrls: ['./breadcrumb.component.scss']
// })
// export class BreadcrumbComponent implements OnInit {
//   protected readonly PageConstants = PageConstants;
//
//   navigationMode = false;
//   private destroy$ = new Subject<void>();
//   breadcrumbMenus: Menu[] = [];
//     recordBreadcrumb = '';
//
//   constructor(
//     private globalService: GlobalService,
//     protected menuService: MenuService,
//     protected navigationService: NavigationService,
//     private router: Router,
//   ) {
//   }
//
//   ngOnInit(): void {
//     this.menuService.breadcrumbMenus$
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(menus => {
//         this.breadcrumbMenus = menus;
//         this.navigationMode = this.globalService.isLoggedIn && menus.length > 0;
//       });
//     this.navigationService.recordBreadcrumb$
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(label => {
//         this.recordBreadcrumb = label;
//       });
//   }
//
//   breadcrumbClick(event: Event, menuId: string): void {
//     event.preventDefault();
//
//     const menu = this.menuService.getMenuById(menuId);
//     if (!menu || menu.disabled) {
//       return;
//     }
//
//     this.navigationService.navigateToMenu(menu);
//   }
//   isClickable(menu: Menu, last: boolean): boolean {
//     return !last || !!this.recordBreadcrumb;
//   }
// }
