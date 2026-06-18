import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Role} from '../../../models/user';
import {NgIf} from '@angular/common';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {FormManagerComponent} from '../../components/form-manager/form-manager.component';
import {FormConstants} from '../../../../constants/form_constants';
import {MatButton} from '@angular/material/button';
import {TypeConstants} from '../../../../constants/type_constants';
import {PageBaseComponent} from '../page-base/page-base.component';
import {FormDialogService} from '../../../services/form-dialog.service';
import {GridManagerComponent} from '../../components/grid-manager/grid-manager.component';
import {GridConstants} from '../../../../constants/grid_constants';

@Component({
  selector: 'app-page010',
  imports: [
    NgIf,
    MatTabGroup,
    MatTab,
    FormManagerComponent,
    MatButton,
    GridManagerComponent
  ],
  templateUrl: './page010.component.html',
  styleUrl: './page010.component.scss'
})
export class Page010Component extends PageBaseComponent {
  protected readonly FormConstants = FormConstants;
  protected readonly TypeConstants = TypeConstants;

  record: Role | null = null;

  constructor(
    route: ActivatedRoute,
    private api: ApiService,
    private formDialogService: FormDialogService,
  ) {
    super(route);
  }

  protected override onParamsLoaded(): void {
    this.loadRecord<Role>(
      this.api,
      `base/role/${this.pk}/`,
      record => this.record = record
    );
  }

  editRole(): void {
    this.launchForm(
      this.formDialogService,
      FormConstants.ROLE,
      this.pk,
      'update'
    );
  }

  protected readonly GridConstants = GridConstants;
}
