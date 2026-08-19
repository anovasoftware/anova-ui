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
import {MatStep, MatStepper, MatStepperNext} from '@angular/material/stepper';
import {Event} from '../../../models/event';

@Component({
  selector: 'app-page017',
  imports: [
    PageTabComponent,
    MatTabGroup,
    MatTab,
    NgIf,
    GridManagerComponent,
    MatStepper,
    MatStep,
    MatStepperNext,
    MatButton
  ],
  templateUrl: './page017.component.html',
  styleUrl: './page017.component.scss'
})
export class Page017Component extends PageBaseComponent {
  protected readonly GridConstants = GridConstants;
  protected readonly FormConstants = FormConstants;
  protected readonly TypeConstants = TypeConstants;

  protected override tabIndexKey = 'tab-page017';
  record: Client | null = null;
  selectedEvent: Event | null = null;

  constructor(
    private api: ApiService,
    private formDialogService: FormDialogService,
  ) {
    super();
  }

  protected override onParamsLoaded(): void {
  }
  onEventSelected(event: any): void {
    this.selectedEvent = event.row;

    console.log('Selected cruise:', this.selectedEvent);
  }
}
