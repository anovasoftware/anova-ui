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
  selector: 'app-page011',
  imports: [
    PageTabComponent,
    MatTabGroup,
    MatTab,
    GridManagerComponent,
    NgIf,
    FormManagerComponent,
    MatButton
  ],
  templateUrl: './page011.component.html',
  styleUrl: './page011.component.css'
})
export class Page011Component extends PageBaseComponent {
  protected readonly GridConstants = GridConstants;
  protected readonly FormConstants = FormConstants;

  constructor(
    route: ActivatedRoute,
    private formDialogService: FormDialogService,
    private globalService: GlobalService,

  ) {
    super(route);
  }
  get hotelId(): string {
    return this.globalService.currentHotelId;
  }

  editHotelDetails(): void {
    this.launchForm(
      this.formDialogService,
      FormConstants.HOTEL,
      this.hotelId,
      'update',
      'hotel_id'
    );
  }


}
