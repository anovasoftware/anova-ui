import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GridComponent} from '../grid/grid.component';
import {GridConstants} from '../../../../constants/grid_constants';
import {GridService} from '../../../services/grid.service';
import {MenuConstants} from '../../../../constants/menu_constants';


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
  @Input() menuId: string = MenuConstants.NOT_APPLICABLE;
  @Input() params: Record<string, string> = {};
  @Input() usePageContainer = true;

  @Output() recordSelected = new EventEmitter<any>();

  protected readonly GridConstants= GridConstants;

  onRecordSelected(event: any): void {
    console.log('GridManager received:', event);

    this.recordSelected.emit(event);
  }

}
