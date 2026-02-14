import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormManagerComponent } from '../core/components/form-manager/form-manager.component'; // adjust path

export type DialogData = {
  formId?: string;
  pk?: string;
  action?: string;
  params?: any;
};

@Injectable({ providedIn: 'root' })
export class FormDialogService {
  constructor(private dialog: MatDialog) {}

  open(data: DialogData, opts?: { width?: string; maxWidth?: string }): MatDialogRef<FormManagerComponent> {
    console.log(data);
    return this.dialog.open(FormManagerComponent, {
      width: opts?.width ?? '500px',
      maxWidth: opts?.maxWidth ?? '90vw',
      data
    });
  }

  openForm(formId: string, pk: string = 'new', action?: string, params?: any) {
    return this.open({ formId, pk, action, params });
  }

  // Convenience: close current dialog (if provided) then open the next
  switchFrom(
    currentRef: MatDialogRef<any> | null | undefined,
    formId: string,
    pk: string = 'new',
    action?: string,
    params?: any
  ) {
    currentRef?.close();
    return this.openForm(formId, pk, action, params);
  }
}
