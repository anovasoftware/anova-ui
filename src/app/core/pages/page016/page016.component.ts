import {Component} from '@angular/core';
import {PageTabComponent} from '../page-tab/page-tab.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {GridManagerComponent} from '../../components/grid-manager/grid-manager.component';
import {GridConstants} from '../../../../constants/grid_constants';
import {NgIf} from '@angular/common';
import {PageBaseComponent} from '../page-base/page-base.component';
import {FormConstants} from '../../../../constants/form_constants';
import {FormDialogService} from '../../../services/form-dialog.service';
import {ApiService} from '../../../services/api.service';
import {Client} from '../../../models/client';
import {TypeConstants} from '../../../../constants/type_constants';
import {GridAddEvent} from '../../components/grid/grid.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-page016',
  imports: [
    PageTabComponent,
    MatTabGroup,
    MatTab,
    NgIf,
    GridManagerComponent
  ],
  templateUrl: './page016.component.html',
  styleUrl: './page016.component.scss'
})
export class Page016Component extends PageBaseComponent {
  protected readonly GridConstants = GridConstants;
  protected readonly FormConstants = FormConstants;
  protected readonly TypeConstants = TypeConstants;

  protected override tabIndexKey = 'tab-page016';
  record: Client | null = null;

  constructor(
    private api: ApiService,
    private formDialogService: FormDialogService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  protected override onParamsLoaded(): void {
  }

  onAddRequested(event: GridAddEvent): void {
    const user = this.user;

    console.log(user);
    if (!user?.agency) {
      event.cancel = true;
      const message = 'Access denied. Must be a travel agent to create a new booking.'
      this.snackBar.open(message, 'OK', {
        duration: 5000
      });
    }

    // if (!this.currentUser?.agencyId) {
    //   event.cancel = true;
    //
    //   this.notificationService.warning(
    //     'You must belong to an agency to create a booking.'
    //   );
    // }
  }
}
