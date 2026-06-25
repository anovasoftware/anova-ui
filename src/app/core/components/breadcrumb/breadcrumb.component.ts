import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {BreadcrumbItem, GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  breadcrumbItems: BreadcrumbItem[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private globalService: GlobalService,
    private router: Router
  ) {
  }

  get navigationMode(): boolean {
    return this.globalService.isLoggedIn && this.breadcrumbItems.length > 0;
  }

  ngOnInit(): void {
    this.globalService.breadcrumbs$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.breadcrumbItems = items;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  breadcrumbClick(event: Event, item: BreadcrumbItem, index: number): void {
    event.preventDefault();

    if (item.commands) {
      this.globalService.trimBreadcrumbsAt(index);
      if (item.menuId) {
        this.globalService.setCurrentMenuId(item.menuId);
      }

      this.router.navigate(item.commands, {
        queryParams: item.queryParams
      });
    }
  }

  isClickable(item: BreadcrumbItem): boolean {
    return !!item.commands;
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
