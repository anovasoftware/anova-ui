import {Component, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
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
import {MenuItem} from '../../../models/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatChip} from '@angular/material/chips';

// import {Constants} from 'src/constants/constants';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    // NgOptimizedImage,
    RouterModule,
    MatMenuModule,
    MatDivider,
    MatFormFieldModule,
    MatSelectModule,
    MatChip,

  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  public const = Constants;
  isLoggedIn = false;
  isDisabledLogin = false;
  userName: string | null = null;
  feVersion = `${this.const.VERSION}`;
  beVersion = `not connected`;
  user: User | null = null;
  headerMenus: MenuItem[] = [];
  selectedHotelId: string | null = null;
  componentLoaded = false;

  private destroy$ = new Subject<void>();

  constructor(
    private globalService: GlobalService,
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private formDialog: FormDialogService
  ) {
  }

  ngOnInit(): void {
    // this.authService.user$.subscribe(user => {
    //   this.user = user;
    //   this.isLoggedIn = !!user;
    // });
    this.globalService.user$.subscribe(global => {
      this.user = global?.user ?? null;
      // this.userName = this.user?.name;
      this.isLoggedIn = !!this.user;
      this.beVersion = `${global?.meta?.version}`;
      this.componentLoaded = true;
    });

    // this.globalService.user$.subscribe(global => {
    //   this.userName = global?.user?.name ?? 'Guest';
    //   this.isLoggedIn = global?.user?.loggedIn ?? false;
    //   this.beVersion = `${global?.meta?.version}`;
    // });
    this.menuService.menus$
      .pipe(takeUntil(this.destroy$))
      .subscribe(menus => {
        this.headerMenus = menus.filter(m => m.typeId === '002');
      });

    // this.menuService.loadMenus();  // ideally only called once (e.g., on login)
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
  onHotelChange(hotelId: string): void {
    this.selectedHotelId = hotelId;
    console.log(hotelId);
    localStorage.setItem('hotelId', hotelId);
  }
}
