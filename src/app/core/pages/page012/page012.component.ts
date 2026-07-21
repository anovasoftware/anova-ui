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

@Component({
  selector: 'app-page012',
  imports: [
    PageTabComponent,
    MatTabGroup,
    MatTab,
    NgIf,
    FormManagerComponent,
    MatButton
  ],
  templateUrl: './page012.component.html',
  styleUrl: './page012.component.scss'
})
export class Page012Component extends PageBaseComponent {
  protected readonly GridConstants = GridConstants;
  protected readonly FormConstants = FormConstants;

  constructor(
    private formDialogService: FormDialogService,
  ) {
    super();
  }


  editClientDetails(): void {
    this.launchForm(
      this.formDialogService,
      FormConstants.CLIENT,
      this.clientExtensionId,
      'update',
      'hotel_id'
    );
  }


}
