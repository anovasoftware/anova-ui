import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeroComponent} from './hero/hero.component';
import {
  MatCard,
  MatCardContent,
  MatCardTitle,
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {FormConstants} from '../../../../constants/form_constants';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormDialogService} from '../../../services/form-dialog.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {ExchangeRateService} from '../../../services/financial.services';
import {AsyncPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {GlobalService} from '../../../services/global.service';
import {map, takeUntil} from 'rxjs/operators';
import {MenuService} from '../../../services/menu.service';
import {combineLatest, Observable, Subject} from 'rxjs';
import {Menu} from '../../../models/menu';
import {TypeConstants} from '../../../../constants/type_constants';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-page001',
  standalone: true,
  imports: [
    HeroComponent,
    MatCard,
    MatCardTitle,
    MatIcon,
    MatCardContent,
    MatButton,
    MatSnackBarModule,
    NgIf,
    AsyncPipe,
    DecimalPipe,
    NgForOf,
    DatePipe,
    MatTooltip,
  ],
  templateUrl: './page001.component.html',
  styleUrls: ['./page001.component.scss'],
})
export class Page001Component implements OnInit, OnDestroy {
  protected readonly TypeConstants = TypeConstants;
  private destroy$ = new Subject<void>();
  navigationMenus$!: Observable<Menu[]>;

  constructor(
    private router: Router,
    private formDialog: FormDialogService,
    private snackBar: MatSnackBar,
    private exchangeRateService: ExchangeRateService,
    protected globalService: GlobalService,
    private menuService: MenuService,
  ) {
  }

  ngOnInit(): void {
    this.exchangeRateService.loadExchangeRates();

    this.navigationMenus$ = combineLatest([
      this.menuService.menus$,
      this.globalService.currentMenuId$
    ]).pipe(
      map(([menus, currentMenuId]) =>
        menus.filter(m =>
          m.typeId === this.TypeConstants.MENU_NAVIGATION &&
          m.parentMenuId === currentMenuId
        )
      )
    );
  }

  // ngOnInit(): void {
  //   this.exchangeRateService.loadExchangeRates();
  //
  //   this.navigationMenus$ = this.menuService.menus$.pipe(
  //     map(menus =>
  //       menus.filter(m =>
  //         m.typeId === this.TypeConstants.MENU_NAVIGATION &&
  //         m.parentMenuId === this.globalService.currentMenuId
  //       )
  //     )
  //   );
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get exchangeRateData$() {
    return this.exchangeRateService.exchangeRateData$;
  }

  onContact(event: MouseEvent) {
    const dialogRef = this.formDialog.openForm(
      FormConstants.CONTACT_US,
      'new',
      'create'
    );

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.success) {
        this.snackBar.open(
          'Your request has been submitted and will be addressed as soon as possible.',
          'OK',
          {
            duration: 9000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
      }
    });
  }

  onRefreshRates(): void {
    this.exchangeRateService.refreshExchangeRates();

    this.snackBar.open(
      'Exchange rates refreshed. (Note: rates only updated every hour)',
      'OK',
      {
        duration: 7000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
  }

  onCardClick(menu: Menu): void {
    console.log(menu);

    this.globalService.setCurrentMenuId(menu.menuId);
    this.menuService.setSelectedMenu(menu);

    if (menu.route) {
      this.router.navigate([menu.route]);
      return;
    }
  }
}
