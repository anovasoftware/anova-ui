import {Component, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {GlobalService} from '../../../services/global.service';
import {Constants} from '../../../../constants/constants';
import {MenuItem, MenuService} from '../../../services/menu.service';
import {RouterModule} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
// import {Constants} from 'src/constants/constants';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, NgOptimizedImage, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  public const = Constants;
  isLoggedIn = false;
  userName: string | null = null;
  feVersion = `${this.const.VERSION}`;
  beVersion = `not connected`;
  user: { name: string } | null = null;
  headerMenus: MenuItem[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private globalService: GlobalService,
    private menuService: MenuService
    ) {}

  ngOnInit(): void {
    this.globalService.user$.subscribe(global => {
      this.userName = global?.user?.name ?? 'Guest';
      this.isLoggedIn = global?.user?.loggedIn ?? false;
      this.beVersion = `${global?.meta?.version}`;
    });
    this.menuService.menus$
      .pipe(takeUntil(this.destroy$))
      .subscribe(menus => {
        this.headerMenus = menus.filter(m => m.typeId === '002');
      });

    this.menuService.loadMenus();  // ideally only called once (e.g., on login)
    // this.menuService.menus$.subscribe(menu => {
    //   this.headerMenu = menu;
    //   // If you expect only one item and want to store it differently:
    //   // this.headerMenu = menu.length > 0 ? [menu[0]] : [];
    // });
    // // this.menuService.headerMenu$.subscribe(menu => this.headerMenu = menu);
    // this.menuService.loadMenu('002');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLogin(): void {
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  get version(): string {
  const feVersion = this?.feVersion;
  const beVersion = this?.beVersion;

  let version = '';
  if (!beVersion) {
    version = `FE: ${feVersion} - BE: not connected`;
  } else if (feVersion === beVersion) {
    version = `${this.const.VERSION}`;
  } else {
    version = `FE: ${feVersion} - BE: ${beVersion}`;
  }
  return version
}

}
