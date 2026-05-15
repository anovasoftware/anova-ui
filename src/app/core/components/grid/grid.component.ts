import {Component, Input, ViewChild} from '@angular/core';
import {GridConstants} from '../../../../constants/grid_constants';
import {Router} from '@angular/router';
import {FormDialogService} from '../../../services/form-dialog.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GlobalService} from '../../../services/global.service';
import {GridService} from '../../../services/grid.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatTooltip} from '@angular/material/tooltip';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {formatDate} from '../../utilities/date-utilities';


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
    MatTooltip,
    MatPaginator,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  private _gridId: string = GridConstants.TO_BE_ANNOUNCED;
  protected readonly GridConstants = GridConstants;
  public dataSource = new MatTableDataSource<any>();
  public totalRows = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input()
  set gridId(value: string) {
    this._gridId = value || GridConstants.TO_BE_ANNOUNCED;

    if (value) {
      this.gridService.loadGrid(value);
    }
  }

  get gridId(): string {
    return this._gridId;
  }

  get grid$() {
    return this.gridService.grid$;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.grid$.subscribe(grid => {
      if (grid) {
        this.dataSource.data = grid.rows || [];
        this.totalRows = this.dataSource.data.length;
      }
    });
  }

  constructor(
    private router: Router,
    private formDialog: FormDialogService,
    private snackBar: MatSnackBar,
    protected globalService: GlobalService,
    private gridService: GridService,
  ) {
  }

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
      // case 'dateX':
      //   return new Intl.DateTimeFormat('en-US').format(new Date(value));
      case 'date':
        return formatDate(value);
      case 'datetime':
        return formatDate(value, true);
      case 'decimal':
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4 // adjust if needed
        }).format(Number(value));
      default:
        return value;
    }
  }

  onRowClick(grid: any, row: any): void {
    const formId = grid?.formId;
    const pk: string = row?.pk;
    let message = '';

    if (!pk) {
      message = 'No id associated with the record.';
    }
    else if (!formId || formId === GridConstants.NOT_APPLICABLE) {
      message = 'No page or form associate with grid';
    }
    else {
      const params = {};
      const action = 'update';

      if (formId) {
        const dialogRef = this.formDialog.openForm(
          grid.formId,
          pk,
          action,
          params
        );
        dialogRef.afterClosed().subscribe(result => {
          if (result?.success) {
            this.gridService.loadGrid(this.gridId, true);

            this.snackBar.open('Record updated', 'Close', {
              duration: 20000
            });
          }
        });
      }
    }
    if (message) {
      this.snackBar.open(message, 'Close', {
        duration: 20000
      });
    }
  }
}
