import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Role, User} from '../../../models/user';
import {NgIf} from '@angular/common';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {FormManagerComponent} from '../../components/form-manager/form-manager.component';
import {FormConstants} from '../../../../constants/form_constants';
import {MatButton} from '@angular/material/button';
import {PersonConstants} from '../../../../constants/person_constants';
import {FormDialogService} from '../../../services/form-dialog.service';
import {AuthService} from '../../../services/auth.service';
import {TypeConstants} from '../../../../constants/type_constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageBaseComponent} from '../page-base/page-base.component';

@Component({
  selector: 'app-page008',
  imports: [
    NgIf,
    MatTabGroup,
    MatTab,
    FormManagerComponent,
    MatButton
  ],
  templateUrl: './page008.component.html',
  styleUrl: './page008.component.scss'
})
export class Page008Component extends PageBaseComponent {
  protected readonly FormConstants = FormConstants;
  protected readonly TypeConstants = TypeConstants;
  protected override tabIndexKey = 'tab-page008';

  record: User | null = null;

  constructor(
    private api: ApiService,
    private formDialogService: FormDialogService,
  ) {
    super();
  }

  protected override onParamsLoaded(): void {
    this.loadRecord<User>(
      this.api,
      `base/user/${this.pk}/`,
      record => this.record = record
    );
  }

  editRecord(): void {
    this.launchForm(
      this.formDialogService,
      FormConstants.PROFILE,
      this.record?.person?.personId || '',
      'update'
    );
  }
}
