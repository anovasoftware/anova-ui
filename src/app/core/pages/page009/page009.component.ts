import { Component } from '@angular/core';
import {GridConstants} from '../../../../constants/grid_constants';
import {GridManagerComponent} from '../../components/grid-manager/grid-manager.component';

@Component({
  selector: 'app-page9',
  imports: [
    GridManagerComponent,
    GridManagerComponent
  ],
  templateUrl: './page009.component.html',
  styleUrl: './page009.component.scss'
})
export class Page006Component {
  protected readonly GridConstants = GridConstants;

}
