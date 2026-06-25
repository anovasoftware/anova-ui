import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {ApiService} from '../../../services/api.service';
import {MenuService} from '../../../services/menu.service';
import {map, observeOn, takeUntil} from 'rxjs/operators';
import {asyncScheduler, combineLatest, Observable, Subject} from 'rxjs';
import {FooterComponent} from '../footer/footer.component';
import {Menu} from '../../../models/menu';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    // SidebarComponent,
    // BreadcrumbComponent
  ],
})
export class MainComponent implements OnInit, OnDestroy {
  public message = 'Loading...';
  public user: { name: string } | null = null;
  public title = 'Welcome!';
  public currentMenu: Menu | null = null;
  public componentLoaded = false;

  private destroy$ = new Subject<void>();
  referenceId$!: Observable<string>;

  constructor(
    private apiService: ApiService,
    private menuService: MenuService,
    private globalService: GlobalService,
  ) {
  }

  ngOnInit(): void {
    this.referenceId$ = combineLatest([
      this.globalService.currentMenuId$,
      this.globalService.currentPageId$
    ]).pipe(
      map(([menuId, pageId]) => {
        const menuPart = menuId ? menuId.padStart(3, '0') : '---';
        const pagePart = pageId ? pageId.padStart(3, '0') : '---';

        return `M${menuPart}-P${pagePart}`;
      }),
      observeOn(asyncScheduler)
    );

    this.menuService.selectedMenu$
      .pipe(takeUntil(this.destroy$))
      .subscribe(menu => {
        setTimeout(() => {
          this.currentMenu = menu;
          document.title = 'AnovaSea';
          // this.componentLoaded = true;
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // get referenceId(): string {
  //   let referenceId = '#';
  //   if (this.currentMenu) {
  //     const menuPart = this.currentMenu.menuId?.padStart(3, '0') ?? '---';
  //     // const pagePart = this.currentMenu.page?.pageId?.padStart(3, '0') ?? '---';
  //     const pagePart = this.globalService.getCurrentPageId();
  //     referenceId = `M${menuPart}-P${pagePart}`;
  //   }
  //   return referenceId
  // }

  get showPageHeader(): boolean {
    return !!(this.currentMenu?.title || this.currentMenu?.subTitle) && false;
  }

}
