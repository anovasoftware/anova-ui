import {Component, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {GlobalService} from '../../../services/global.service';
import {Constants} from '../../../../constants/constants';
import {FormConstants} from '../../../../constants/form_constants';
import {PersonConstants} from '../../../../constants/person_constants';
import {MenuService} from '../../../services/menu.service';
import {Router, RouterModule} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatDivider} from '@angular/material/divider';
import {MatDialog} from '@angular/material/dialog';
import {FormManagerComponent} from '../form-manager/form-manager.component';
import {FormDialogService} from '../../../services/form-dialog.service';
import {User} from '../../../models/user';
import {Menu} from '../../../models/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {UserService} from '../../../services/user.service';
import {MenuConstants} from '../../../../constants/menu_constants';
import {PageConstants} from '../../../../constants/page_constants';
import {MatSnackBar} from '@angular/material/snack-bar';

// import {Constants} from 'src/constants/constants';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatDivider,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  protected const = Constants;
  protected readonly MenuConstants = MenuConstants;
  protected readonly PageConstants = PageConstants;

  isLoggedIn = false;
  isDisabledLogin = false;
  userName: string | null = null;
  feVersion = `${this.const.VERSION}`;
  beVersion = `not connected`;
  user: User | null = null;
  headerMenus: Menu[] = [];
  selectedHotelId: string | null = null;
  componentLoaded = false;
  // breadcrumbMenus: Menu[] = [];
  // navigationMode = false;

  private destroy$ = new Subject<void>();

  constructor(
    private globalService: GlobalService,
    protected menuService: MenuService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private formDialog: FormDialogService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.globalService.global$.pipe(takeUntil(this.destroy$)).subscribe(global => {
      this.user = global.user;
      this.isLoggedIn = !!global.user;
      this.beVersion = `${global.meta?.version}`;
      this.componentLoaded = true;
    });

    this.menuService.menus$.pipe(takeUntil(this.destroy$)).subscribe(menus => {
      this.headerMenus = menus.filter(m => m.typeId === '002');
    });
    this.globalService.currentHotelId$.pipe(takeUntil(this.destroy$)).subscribe(hotelId => {
      this.selectedHotelId = hotelId;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLogin(event: MouseEvent) {
    // allow open-in-new-tab / ctrl-click / middle-click to still navigate
    if (event.ctrlKey || event.metaKey || event.button === 1) return;

    event.preventDefault();
    this.formDialog.openForm(FormConstants.LOGIN, 'new', 'create');
    // this.dialog.open(FormManagerComponent, {
    //   width: '500px',
    //   maxWidth: '90vw',
    //   data: { formId: FormConstants.LOGIN, pk: 'new' }
    // });
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

  onLogout(): void {
    this.authService.logout();
    // this.globalService.loadPublicMeta();  // Optional: refresh public meta
    this.router.navigate(['/navigator/001']);  // Or home page after logout
  }

  onProfile() {
    const params = {};
    const creatingPerson = this.user?.person?.personId === PersonConstants.TO_BE_ANNOUNCED;
    const personId = creatingPerson ? 'new' : this.user?.person?.personId;
    const action = creatingPerson ? 'create' : 'update';
    const dialogRef = this.formDialog.openForm(FormConstants.PROFILE, personId, action, params);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        const personId = result?.data?.recordId;

        if (personId) {
          const user = result.data?.user;
          this.authService.storeUser(user);
        }
      }
    });
  }

  // onHotelChangeOld(hotelId: string): void {
  //   this.selectedHotelId = hotelId;
  //   this.userService.setLastHotel(hotelId);
  //   console.log(hotelId);
  //   localStorage.setItem('hotelId', hotelId);
  // }
  onHotelChange(hotelId: string): void {
    this.globalService.setCurrentHotelId(hotelId);
    this.selectedHotelId = hotelId;

    if (this.user) {
      this.userService.setLastHotel(this.user.userId, hotelId).subscribe({
        next: (response) => {
          if (!response.success) {
            console.error('setLastHotel failed:', response.message, response.errors);
          }
        },
        error: (err) => {
          const message =
            err?.error?.errors?.join(' | ') ||
            err?.error?.message ||
            err?.message ||
            'Unable to update hotel.';

          this.snackBar.open(message, 'OK', {
            duration: 5000
          });

          console.error('setLastHotel HTTP error:', err);
        }
      });
    }
  }

  // onHotelChange(hotelId: string): void {
  //   localStorage.setItem('hotelId', hotelId);
  //   this.selectedHotelId = hotelId;
  //
  //   if (!!this.user) {
  //     this.userService.setLastHotel(this.user.userId, hotelId).subscribe({
  //       next: (response) => {
  //         if (!response.success) {
  //           console.error('setLastHotel failed:', response.message, response.errors);
  //         }
  //       },
  //       error: (err) => console.error('setLastHotel HTTP error:', err)
  //     });
  //   }
  // }

  // oldNavigationMode(): boolean {
  //   let navigationMode = true;
  //   if (!this.globalService.isLoggedIn) {
  //     navigationMode = false;
  //   }
  //   else if (this.breadcrumbMenus.length > 1) {
  //     navigationMode = false;
  //   }
  //   console.log('navigationMode', navigationMode);
  //   return navigationMode;
  // }

  // get navigationMode(): boolean {
  //   const mode = this.globalService.isLoggedIn && this.breadcrumbMenus.length > 1;
  //   console.log('navigationMode', mode);
  //   console.log('this.breadcrumbMenus', this.breadcrumbMenus);
  //   return mode;
  // }
  // goHome(event: Event): void {
  //   event.preventDefault();
  //
  //   this.globalService.setCurrentMenuId(this.MenuConstants.HOME);
  //   let booleanPromise = this.router.navigateByUrl(`/navigator/${this.PageConstants.HOME}`);
  // }

  // goToMenu(event: Event, menuId: string): void {
  //   event.preventDefault();
  //
  //   const menu = this.menuService.getMenuById(menuId);
  //   if (!menu) {
  //     return;
  //   }
  //   console.log('menu', menu);
  //   this.globalService.setCurrentMenuId(menuId);
  //   this.menuService.setSelectedMenu(menu);
  //
  //   if (menu.page?.pageId && menu.page.pageId !== this.PageConstants.NOT_APPLICABLE) {
  //     let promise = this.router.navigate(['/navigator', menu.page.pageId]);
  //   }
  // }
}
