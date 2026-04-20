import { Component } from '@angular/core';
import {GridConstants} from '../../../../constants/grid_constants';
import {GridManagerComponent} from '../../components/grid-manager/grid-manager.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page007',
  imports: [
    GridManagerComponent,
    GridManagerComponent
  ],
  templateUrl: './page007.component.html',
  styleUrl: './page007.component.scss'
})
export class Page007Component {
  protected readonly GridConstants = GridConstants;

  gridId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gridId = params['gridId'];
      console.log('gridId:', this.gridId);
    });
  }

}
