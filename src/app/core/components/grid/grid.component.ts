import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {GridConstants} from '../../../../constants/grid_constants';
import {PageConstants} from '../../../../constants/page_constants';
import {FormConstants} from '../../../../constants/form_constants';
import {Router} from '@angular/router';
import {FormDialogService} from '../../../services/form-dialog.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GlobalService} from '../../../services/global.service';
import {GridService} from '../../../services/grid.service';
import {AsyncPipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef} from '@angular/material/table';
import {MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable} from '@angular/material/table';

import {MatTooltip} from '@angular/material/tooltip';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {formatDate} from '../../utilities/date-utilities';
import {NavigationService} from '../../../services/navigation.service';
import {MenuService} from '../../../services/menu.service';
import {MatButton} from '@angular/material/button';
import {MenuConstants} from '../../../../constants/menu_constants';
import {MatCheckbox} from '@angular/material/checkbox';
import {CommonModule, KeyValuePipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {Column, Grid} from '../../../models/grid';
import {MatInput} from '@angular/material/input';

interface GridCellChange {
  recordId: string;
  field: string;
  value: number | string | null;
}

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
    NgSwitch,
    MatCheckbox,
    NgSwitchCase,
    NgSwitchDefault,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInput
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnChanges {
  @Input() gridId: string = GridConstants.TO_BE_ANNOUNCED;
  @Input() menuId: string = MenuConstants.NOT_APPLICABLE;
  @Input() usePageContainer = true;
  @Input() params: Record<string, string> = {};

  @Output() recordSelected = new EventEmitter<any>();

  protected readonly GridConstants = GridConstants;
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  checkboxChanges = new Map<string, any>();
  currentGrid: any;
  private changedCells = new Map<string, GridCellChange>();

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
    this.currentGrid = grid;
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

  // getColumnClass(column: Column): string {
  //   switch (column.format) {
  //     case 'checkbox':
  //       return 'grid-col-checkbox';
  //     default:
  //       return '';
  //   }
  // }
  getColumnClass(column: any): string {
    switch (column.format) {
      case 'checkbox':
        return 'grid-col-checkbox';

      case 'currency':
      case 'number':
        return 'numeric-column';

      default:
        return '';
    }
  }

  getCellClass(row: any, column: any): string[] {
    const classes = [this.getColumnClass(column)];

    if (column.format === 'truefalse') {
      const value = this.getCellValue(row, column.dataPath || column.field);
      classes.push(value ? 'true-cell' : 'false-cell');
    }

    return classes;
  }

  onAddClick(grid: any): void {
    this.openGridRecord(grid, 'new', 'create', null);
  }

  onRowClick(grid: any, row: any): void {
    const action = grid?.rowAction ?? 'update;'
    this.openGridRecord(grid, row?.pk, action, row);
  }

  private openGridRecord(
    grid: any,
    pk: string,
    action: 'create' | 'update' | 'select',
    row: any
  ): void {
    const pageId = grid?.pageId;
    const formId = grid?.formId;

    let message = '';

    if (!pk) {
      message = 'No id associated with the record.';
    } else if (action == 'select') {
        this.recordSelected.emit({pk, row});
    } else if (pageId && pageId !== PageConstants.NOT_APPLICABLE && ['create', 'update'].includes(action)) {
      this.navigationService.setRecordBreadcrumb(row?.displayAs);

      if (this.menuId !== MenuConstants.NOT_APPLICABLE) {
        this.globalService.setCurrentMenuId(this.menuId);
        this.menuService.setSelectedMenu(this.menuService.getMenuById(this.menuId));
      } else {
        const pageMenu = this.menuService.getMenuByPageId(pageId);
        this.globalService.setCurrentPageId(pageId);
        if (pageMenu) {
          this.globalService.setCurrentMenuId(pageMenu.menuId);
          this.menuService.setSelectedMenu(pageMenu);
        }
      }

      void this.router.navigate([`/page${pageId}`], {
        queryParams: {
          pk,
          action
        }
      });
    } else if (!formId || formId === FormConstants.NOT_APPLICABLE) {
      message = 'No page or form associated with grid: ' + this.gridId;
    } else {
      console.log(this.params);
      const dialogRef = this.formDialog.openForm(
        formId,
        pk,
        action,
        this.params,
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

  onCheckboxChange(row: any, column: any, checked: boolean): void {
    row[column.field] = checked;

    const rowId = row.id || row.pk || row[column.keyField || 'id'];

    this.checkboxChanges.set(`${rowId}_${column.field}`, {
      recordId: rowId,
      field: column.field,
      value: checked,
      row
    });
  }

  hasCheckboxChanges(): boolean {
    return this.checkboxChanges.size > 0;
  }

  // onSaveCheckboxChanges(grid: any): void {
  //   const changes = Array.from(this.checkboxChanges.values()).map(change => ({
  //     recordId: change.recordId,
  //     field: change.field,
  //     value: change.value
  //   }));
  //
  //   const payload = {
  //     gridId: grid.gridId,
  //     changes
  //   };
  //
  //   this.gridService.saveGrid(
  //     grid.gridId,
  //     payload,
  //     this.params
  //   ).subscribe({
  //     next: (response: any) => {
  //       this.checkboxChanges.clear();
  //
  //       this.snackBar.open(
  //         response?.message || 'Updated successfully.',
  //         'Close',
  //         {
  //           duration: 7000
  //         }
  //       );
  //     },
  //
  //     error: (error) => {
  //       const message =
  //         error?.error?.message ||
  //         error?.error?.detail ||
  //         error?.message ||
  //         'Unable to save changes.';
  //
  //       this.snackBar.open(
  //         message,
  //         'Close',
  //         {
  //           duration: 10000
  //         }
  //       );
  //     }
  //   });
  // }
  onSaveChanges(grid: any): void {
    const checkboxChanges = Array.from(
      this.checkboxChanges.values()
    ).map(change => ({
      recordId: change.recordId,
      field: change.field,
      value: change.value
    }));

    const cellChanges = Array.from(
      this.changedCells.values()
    ).map(change => ({
      recordId: change.recordId,
      field: change.field,
      value: change.value
    }));

    const changes = [
      ...checkboxChanges,
      ...cellChanges
    ];

    const params = {
      ...this.params,
      ...this.getLookupParams(this.currentGrid)
    };

    const payload = {
      gridId: grid.gridId,
      changes
    };

    this.gridService.saveGrid(grid.gridId, payload, params).subscribe({
      next: (response: any) => {
        this.checkboxChanges.clear();
        this.changedCells.clear();

        this.snackBar.open(
          response?.message || 'Updated successfully.',
          'Close',
          {
            duration: 7000
          }
        );
      },
      error: (error) => {
        const message =
          error?.error?.message ||
          error?.error?.detail ||
          error?.message ||
          'Unable to save changes.';

        this.snackBar.open(message, 'Close', {duration: 10000});
      }
    });
  }

  get loading$() {
    return this.gridService.loading$;
  }

  get error$() {
    return this.gridService.error$;
  }

  // reloadGrid(): void {
  //   console.log('reloading grid', this.params);
  //   this.gridService.loadGrid(this.gridId, true, this.params);
  // }
  reloadGrid(): void {
    const params = {
      ...this.params,
      ...this.getLookupParams(this.currentGrid)
    };
    this.gridService.loadGrid(
      this.gridId,
      true,
      params
    );
  }

  private getLookupParams(grid: any): Record<string, string> {
    const params: Record<string, string> = {};

    const lookups = grid?.lookups ?? {};

    for (const lookup of Object.values(lookups) as any[]) {
      const paramField = lookup.paramName;
      const selectedValue = lookup.selectedId;

      if (
        paramField &&
        selectedValue !== null &&
        selectedValue !== undefined &&
        selectedValue !== ''
      ) {
        params[paramField] = String(selectedValue);
      }
    }

    return params;
  }

  lookupChanged(): void {
    this.reloadGrid();
  }

  // onCellChange(row: any, column: Column, rawValue: string): void {
  //   const field = column.dataPath || column.field;
  //
  //   const value =
  //     column.format === 'currency' || column.format === 'number'
  //       ? rawValue === ''
  //         ? null
  //         : Number(rawValue)
  //       : rawValue;
  //
  //   row[field] = value;
  // }
  onCellChange(row: any, column: Column, rawValue: string): void {
    const field = column.dataPath || column.field;

    const value =
      column.format === 'currency' || column.format === 'number'
        ? rawValue.trim() === ''
          ? null
          : Number(rawValue.replace(/,/g, ''))
        : rawValue;

    if (typeof value === 'number' && Number.isNaN(value)) {
      return;
    }

    row[field] = value;

    const recordId = row.pk;
    const key = `${recordId}|${field}`;

    this.changedCells.set(key, {
      recordId,
      field,
      value
    });
  }

  getInputValue(row: any, column: Column): string {
    const value = this.getCellValue(row, column.dataPath || column.field);

    if (column.format === 'currency') {
      return Number(value ?? 0).toFixed(2);
    }

    return value;
  }

  // get hasChanges(): boolean {
  //   return this.changedCells.size > 0;
  // }

  hasPendingChanges(): boolean {
    return (
      this.hasCheckboxChanges() ||
      this.changedCells.size > 0
    );
  }
}
