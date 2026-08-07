import {Component} from '@angular/core';
import {PageTabComponent} from '../page-tab/page-tab.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {GridManagerComponent} from '../../components/grid-manager/grid-manager.component';
import {GridConstants} from '../../../../constants/grid_constants';
import {NgIf} from '@angular/common';
import {PageBaseComponent} from '../page-base/page-base.component';
import {ActivatedRoute} from '@angular/router';
import {FormManagerComponent} from '../../components/form-manager/form-manager.component';
import {MatButton} from '@angular/material/button';
import {FormConstants} from '../../../../constants/form_constants';
import {FormDialogService} from '../../../services/form-dialog.service';
import {GlobalService} from '../../../services/global.service';
import {User} from '../../../models/user';
import {ApiService} from '../../../services/api.service';
import {Client} from '../../../models/client';
import {TypeConstants} from '../../../../constants/type_constants';

@Component({
  selector: 'app-page014',
  imports: [
    PageTabComponent,
    MatTabGroup,
    MatTab,
    NgIf,
    GridManagerComponent,
    FormManagerComponent,
    MatButton
  ],
  templateUrl: './page014.component.html',
  styleUrl: './page014.component.scss'
})
export class Page014Component extends PageBaseComponent {
  protected readonly GridConstants = GridConstants;
  protected readonly FormConstants = FormConstants;
    protected readonly TypeConstants = TypeConstants;

  protected override tabIndexKey = 'tab-page014';
  record: Client | null = null;

  constructor(
    private api: ApiService,
    private formDialogService: FormDialogService,
  ) {
    super();
  }

  protected override onParamsLoaded(): void {
  }
  editAgencyProfile(): void {
    this.launchForm(
      this.formDialogService,
      FormConstants.COMPANY_TRAVEL_AGENCY,
      this.pk,
      'update',
      ''
    );
  }

}
