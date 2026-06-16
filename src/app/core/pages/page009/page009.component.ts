import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {GridManagerComponent} from '../../components/grid-manager/grid-manager.component';
import {PageBaseComponent} from '../page-base/page-base.component';

@Component({
  selector: 'app-page009',
  imports: [GridManagerComponent],
  templateUrl: './page009.component.html',
  styleUrl: './page009.component.scss'
})
export class Page009Component extends PageBaseComponent {

  constructor(route: ActivatedRoute) {
    super(route);
  }

  protected override onParamsLoaded(): void {
    // console.log(this.gridId);
    // console.log(this.params);
  }
}
