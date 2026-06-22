import {Component, Input} from '@angular/core';
import {GridComponent} from '../grid/grid.component';
import {GridConstants} from '../../../../constants/grid_constants';
import {GridService} from '../../../services/grid.service';


@Component({
  selector: 'app-grid-manager',
  standalone: true,
  imports: [
    GridComponent
  ],
  templateUrl: './grid-manager.component.html',
  styleUrl: './grid-manager.component.scss',
    providers: [GridService]
})
export class GridManagerComponent {
  @Input() gridId: string = GridConstants.TO_BE_ANNOUNCED;
  @Input() params: Record<string, string> = {};
  @Input() usePageContainer = true;

  protected readonly GridConstants= GridConstants;


}
