import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {GridConstants} from '../../../../constants/grid_constants';
import {PageConstants} from '../../../../constants/page_constants';
import {FormConstants} from '../../../../constants/form_constants';
import {Router} from '@angular/router';
import {FormDialogService} from '../../../services/form-dialog.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GlobalService} from '../../../services/global.service';
import {GridService} from '../../../services/grid.service';
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common';

import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef} from '@angular/material/table';
import {MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable} from '@angular/material/table';

import {MatTooltip} from '@angular/material/tooltip';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {formatDate} from '../../utilities/date-utilities';
import {NavigationService} from '../../../services/navigation.service';
import {MenuService} from '../../../services/menu.service';
import {MatButton} from '@angular/material/button';


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
    MatButton,
    NgClass,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnChanges {
  @Input() gridId: string = GridConstants.TO_BE_ANNOUNCED;
  @Input() usePageContainer = true;
  @Input() params: Record<string, string> = {};

  protected readonly GridConstants = GridConstants;
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private formDialog: FormDialogService,
    private snackBar: MatSnackBar,
    protected globalService: GlobalService,
    private gridService: GridService,
    private navigationService: NavigationService,
    private menuService: MenuService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gridId && this.gridId !== GridConstants.TO_BE_ANNOUNCED) {
      this.gridService.loadGrid(this.gridId, true, this.params);
    }
  }

  get grid$() {
    return this.gridService.grid$;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  setGridData(grid: any): boolean {
    const rows = grid?.rows || [];

    if (this.dataSource.data !== rows) {
      this.dataSource.data = rows;
    }

    return true;
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

  onAddClick(grid: any): void {
    this.openGridRecord(grid, 'new', 'create', null);
  }

  onRowClick(grid: any, row: any): void {
    this.openGridRecord(grid, row?.pk, 'update', row);
  }

  private openGridRecord(
    grid: any,
    pk: string,
    action: 'create' | 'update',
    row: any
  ): void {
    const pageId = grid?.pageId;
    const formId = grid?.formId;

    let message = '';

    if (!pk) {
      message = 'No id associated with the record.';
    } else if (pageId && pageId !== PageConstants.NOT_APPLICABLE && action === 'update') {
      this.navigationService.setRecordBreadcrumb(row?.displayAs);

      const pageMenu = this.menuService.getMenuByPageId(pageId);

      if (pageMenu) {
        this.globalService.setCurrentMenuId(pageMenu.menuId);
        this.menuService.setSelectedMenu(pageMenu);
      }

      void this.router.navigate([`/page${pageId}`], {
        queryParams: {
          pk,
          action
        }
      });
    } else if (!formId || formId === FormConstants.NOT_APPLICABLE) {
      message = 'No page or form associated with grid.';
    } else {
      const dialogRef = this.formDialog.openForm(
        formId,
        pk,
        action,
        {}
      );

      dialogRef.afterClosed().subscribe(result => {
        if (result?.success) {
          this.gridService.loadGrid(this.gridId, true, this.params);

          this.snackBar.open(
            action === 'create' ? 'Record created' : 'Record updated',
            'Close',
            {duration: 20000}
          );
        }
      });
    }

    if (message) {
      this.snackBar.open(message, 'Close', {
        duration: 20000
      });
    }
  }

  // onRowClick(grid: any, row: any): void {
  //   const pageId = grid?.pageId;
  //   const formId = grid?.formId;
  //   const pk: string = row?.pk;
  //
  //   let message = '';
  //
  //   if (!pk) {
  //     message = 'No id associated with the record.';
  //   } else if (pageId && pageId !== PageConstants.NOT_APPLICABLE) {
  //     this.navigationService.setRecordBreadcrumb(
  //       row.displayAs
  //     );
  //     const pageMenu = this.menuService.getMenuByPageId(pageId);
  //
  //     if (pageMenu) {
  //       this.globalService.setCurrentMenuId(pageMenu.menuId);
  //       this.menuService.setSelectedMenu(pageMenu);
  //     }
  //     void this.router.navigate([`/page${pageId}`], {
  //       queryParams: {
  //         pk,
  //         action: 'update'
  //       }
  //     });
  //   } else if (!formId || formId === FormConstants.NOT_APPLICABLE) {
  //     message = 'No page or form associated with grid.';
  //   } else {
  //     const dialogRef = this.formDialog.openForm(
  //       formId,
  //       pk,
  //       'update',
  //       {}
  //     );
  //
  //     dialogRef.afterClosed().subscribe(result => {
  //       if (result?.success) {
  //         this.gridService.loadGrid(this.gridId, true, this.params);
  //
  //         this.snackBar.open('Record updated', 'Close', {
  //           duration: 20000
  //         });
  //       }
  //     });
  //   }
  //
  //   if (message) {
  //     this.snackBar.open(message, 'Close', {
  //       duration: 20000
  //     });
  //   }
  // }
}
