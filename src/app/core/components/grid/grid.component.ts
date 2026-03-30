import {Component, Input} from '@angular/core';
import {GridConstants} from '../../../../constants/grid_constants';

@Component({
  selector: 'app-grid',
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  @Input() gridId: string | null = null;
  protected readonly GridConstants = GridConstants;


}
