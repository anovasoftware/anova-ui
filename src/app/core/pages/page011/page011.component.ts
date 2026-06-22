import {Component} from '@angular/core';
import {PageTabComponent} from '../page-tab/page-tab.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {GridManagerComponent} from '../../components/grid-manager/grid-manager.component';
import {GridConstants} from '../../../../constants/grid_constants';
import {NgIf} from '@angular/common';
import {PageBaseComponent} from '../page-base/page-base.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page011',
  imports: [
    PageTabComponent,
    MatTabGroup,
    MatTab,
    GridManagerComponent,
    NgIf
  ],
  templateUrl: './page011.component.html',
  styleUrl: './page011.component.css'
})
export class Page011Component extends PageBaseComponent {

  constructor(route: ActivatedRoute) {
    super(route);
  }

  protected readonly GridConstants = GridConstants;
}
