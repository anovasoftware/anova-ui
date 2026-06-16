import {Component, Input} from '@angular/core';
import {GridComponent} from '../grid/grid.component';
import {GridConstants} from '../../../../constants/grid_constants';


@Component({
  selector: 'app-grid-manager',
  standalone: true,
  imports: [
    GridComponent
  ],
  templateUrl: './grid-manager.component.html',
  styleUrl: './grid-manager.component.css'
})
export class GridManagerComponent {
  @Input() gridId: string = GridConstants.TO_BE_ANNOUNCED;
  @Input() params: Record<string, string> = {};

  protected readonly GridConstants= GridConstants;


}
