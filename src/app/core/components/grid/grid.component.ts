import {Component, Input} from '@angular/core';
import {GridConstants} from '../../../../constants/grid_constants';
import {Router} from '@angular/router';
import {FormDialogService} from '../../../services/form-dialog.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ExchangeRateService} from '../../../services/financial.services';
import {GlobalService} from '../../../services/global.service';
import {MenuService} from '../../../services/menu.service';
import {GridService} from '../../../services/grid.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    NgForOf,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatTooltip
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  @Input() gridId: string = GridConstants.TO_BE_ANNOUNCED;
  protected readonly GridConstants = GridConstants;

  constructor(
    private router: Router,
    private formDialog: FormDialogService,
    private snackBar: MatSnackBar,
    protected globalService: GlobalService,
    private gridService: GridService,
  ) {
  }

  ngOnInit(): void {
    this.gridService.loadGrid(this.gridId);
  }

  get grid$() {
    return this.gridService.grid$;
  }

  // getCellValue(row: any, path: string): any {
  //   if (!row || !path) return '';
  //
  //   return path.split('.').reduce((obj, key) => obj?.[key], row) ?? '';
  // }
  getCellValue(row: any, path: string): any {
    if (!row || !path) return '';

    return path.split('.').reduce((obj, key) => obj?.[key], row) ?? '';
  }

  formatCellValue(value: any, format?: string): any {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    switch (format) {
      case 'uppercase':
        return String(value).toUpperCase();

      case 'lowercase':
        return String(value).toLowerCase();

      case 'yesno':
        return value ? 'Yes' : 'No';

      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(Number(value));

      case 'date':
        return new Intl.DateTimeFormat('en-US').format(new Date(value));

      case 'datetime':
        return new Intl.DateTimeFormat('en-US', {
          dateStyle: 'short',
          timeStyle: 'short'
        }).format(new Date(value));

      default:
        return value;
    }
  }

}
