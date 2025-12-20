import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {ApiService} from '../../../services/api.service';
import {MenuItem, MenuService} from '../../../services/menu.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FooterComponent} from '../footer/footer.component';

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
    // SidebarComponent,
    // BreadcrumbComponent
  ],
})
export class MainComponent implements OnInit, OnDestroy {
  public message = 'Loading...';
  public user: { name: string } | null = null;
  public title = 'Welcome!';
  public currentMenu: MenuItem | null = null;
  public componentLoaded = false;

  private destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private menuService: MenuService
  ) {
  }

  // ngOnInit(): void {
  //   this.menuService.selectedMenu$
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(menu => {
  //       setTimeout(() => {
  //         this.currentMenu = menu;
  //
  //         // const docTitle = 'AnovaSea';
  //         // if (menu) {
  //         // } else {
  //         //   document.title = 'My App';
  //         // }
  //         document.title = 'AnovaSea';
  //         this.componentLoaded = true;
  //       });
  //     });
  // }

  ngOnInit(): void {
    this.menuService.loadMenus();

    this.menuService.selectedMenu$
      .pipe(takeUntil(this.destroy$))
      .subscribe(menu => {
        setTimeout(() => {
          this.currentMenu = menu;
          document.title = 'AnovaSea';
          this.componentLoaded = true;
        });
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  get referenceId(): string {
    if (!this.currentMenu) {
      return '';
    }

    const menuPart = this.currentMenu.menuId?.padStart(3, '0') ?? '---';
    const pagePart = this.currentMenu.page?.pageId?.padStart(3, '0') ?? '---';

    return `M${menuPart}-P${pagePart}`;
  }
  get showPageHeader(): boolean {
    return !!(this.currentMenu?.title || this.currentMenu?.subTitle);
  }

}
