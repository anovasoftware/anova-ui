import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {Menu} from '../../../models/menu';
import {Router} from '@angular/router';
import {FormDialogService} from '../../../services/form-dialog.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ExchangeRateService} from '../../../services/financial.services';
import {GlobalService} from '../../../services/global.service';
import {MenuService} from '../../../services/menu.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Observable} from 'rxjs';
import {NavigationService} from '../../../services/navigation.service';

@Component({
  selector: 'app-navigator-menu',
  standalone: true,
  imports: [
    MatCard,
    MatTooltip,
    MatTooltip,
    MatTooltip,
    MatCardContent,
    MatIcon,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './navigator-menu.component.html',
  styleUrl: './navigator-menu.component.scss'
})
export class NavigatorMenuComponent implements OnInit {
  navigationMenus$!: Observable<Menu[]>;

  constructor(
    private router: Router,
    protected globalService: GlobalService,
    private menuService: MenuService,
    private navigationService: NavigationService
  ) {
  }

  ngOnInit(): void {
    this.navigationMenus$ = this.menuService.getCurrentNavigationMenus();
  }

  onCardClickOld(menu: Menu): void {
    if (!menu.disabled) {
        this.globalService.setCurrentMenuId(menu.menuId);
      this.menuService.setSelectedMenu(menu);

      if (menu.route) {
        let route = menu.route;
        if (route === 'page' && menu.page) {
          route = `/page${menu.page?.pageId}`;
        }
        void this.router.navigate([route], {
          queryParams: { gridId: menu.gridId }
        });
        // this.router.navigate([route]);
        return;
      }
    }
  }
  onCardClick(menu: Menu): void {
    if (menu.disabled) {
      return;
    }

    this.navigationService.navigateToMenu(menu);
  }
}
