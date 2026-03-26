import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {takeUntil} from 'rxjs/operators';
import {GlobalService} from '../../../services/global.service';
import {MenuService} from '../../../services/menu.service';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormDialogService} from '../../../services/form-dialog.service';
import {Subject} from 'rxjs';
import {Menu} from '../../../models/menu';
import {PageConstants} from '../../../../constants/page_constants';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,  // ✅ Mark it as a standalone component
  imports: [CommonModule],  // ✅ Import required modules
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  protected readonly PageConstants = PageConstants;

  navigationMode = false;
  private destroy$ = new Subject<void>();
  breadcrumbMenus: Menu[] = [];

  constructor(
    private globalService: GlobalService,
    protected menuService: MenuService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private formDialog: FormDialogService
  ) {
  }

  ngOnInit(): void {
    // this.globalService.global$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(global => {
    //     this.user = global.user;
    //     this.isLoggedIn = !!global.user;
    //     this.beVersion = `${global.meta?.version}`;
    //     this.componentLoaded = true;
    //   });
    //
    // this.menuService.menus$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(menus => {
    //     this.headerMenus = menus.filter(m => m.typeId === '002');
    //     // this.breadcrumbMenus = menus;
    //   });

    this.menuService.breadcrumbMenus$
      .pipe(takeUntil(this.destroy$))
      .subscribe(menus => {
        this.breadcrumbMenus = menus;
        this.navigationMode = this.globalService.isLoggedIn && menus.length > 0;
      });
  }

  breadcrumbClick(event: Event, menuId: string): void {
    event.preventDefault();

    const menu = this.menuService.getMenuById(menuId);
    if (!menu) {
      return;
    }
    console.log('menu', menu);
    this.globalService.setCurrentMenuId(menuId);
    this.menuService.setSelectedMenu(menu);

    if (menu.page?.pageId && menu.page.pageId !== this.PageConstants.NOT_APPLICABLE) {
      let promise = this.router.navigate(['/navigator', menu.page.pageId]);
    }
  }

}
