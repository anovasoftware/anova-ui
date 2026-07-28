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
  selector: 'app-page012',
  imports: [
    PageTabComponent,
    MatTabGroup,
    MatTab,
    NgIf,
    FormManagerComponent,
    MatButton,
    GridManagerComponent
  ],
  templateUrl: './page012.component.html',
  styleUrl: './page012.component.scss'
})
export class Page012Component extends PageBaseComponent {
  protected readonly GridConstants = GridConstants;
  protected readonly FormConstants = FormConstants;

  protected override tabIndexKey = 'tab-page012';
  record: Client | null = null;

  constructor(
    private api: ApiService,
    private formDialogService: FormDialogService,
  ) {
    super();
  }

  protected override onParamsLoaded(): void {
    console.log('onParamsLoaded');
    this.loadRecord<Client>(
      this.api,
      `base/client/${this.pk}/`,
      record => this.record = record
    );
  }


  editClientDetails(): void {
    this.launchForm(
      this.formDialogService,
      FormConstants.CLIENT,
      this.clientExtensionId,
      'update',
      'clientId'
    );
  }


  protected readonly TypeConstants = TypeConstants;
}
