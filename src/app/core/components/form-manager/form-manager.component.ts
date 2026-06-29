import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Location} from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn
} from '@angular/forms';
import {FormService} from '../../../services/form.service';
import {Form, FormExtra} from '../../../models/form';
import {WidgetTextboxComponent} from '../../widgets/widget-textbox/widget-textbox.component';
import {TypeConstants} from '../../../../constants/type_constants';
import {FormExtraConstants} from '../../../../constants/form_extra_constants';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {handleForm001Response} from '../../../form-handlers/form001.handler';
import {AuthService} from '../../../services/auth.service';
import {MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormDialogService} from '../../../services/form-dialog.service';
import {WidgetTextareaComponent} from '../../widgets/widget-textarea/widget-textarea.component';
import {WidgetSelect1Component} from '../../widgets/widget-select1/widget-select1.component';
import {WidgetChipsComponent} from '../../widgets/widget-chips/widget-chips.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {WidgetSpinnerComponent} from '../../widgets/widget-spinner/widget-spinner.component';
import {WidgetDate1Component} from '../../widgets/widget-date1/widget-date1.component';
import {WidgetCheckboxComponent} from '../../widgets/widget-checkbox/widget-checkbox.component';


type DialogData = {
  formId?: string;
  recordId?: string;
  action?: string;
  params?: any;
};

@Component({
  selector: 'app-form-manager',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WidgetTextboxComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatIconModule,
    WidgetTextareaComponent,
    WidgetSelect1Component,
    WidgetChipsComponent,
    WidgetSpinnerComponent,
    WidgetDate1Component,
    WidgetCheckboxComponent,
  ],
  templateUrl: './form-manager.component.html',
  styleUrl: './form-manager.component.scss'
})
export class FormManagerComponent implements OnInit {
  @Input() formId!: string;
  @Input() recordId!: string;
  @Input() action = 'create';
  @Input() params?: any;
  @Input() inline = false;

  protected readonly formHandlers: { [formId: string]: (response: any) => void } = {};
  protected readonly TypeConstants = TypeConstants;
  protected readonly FormExtraConstants = FormExtraConstants;
  // The loaded form metadata (from your service)
  form?: Form;

  // The reactive form group
  formGroup: FormGroup;
  header: string = '';
  componentLoaded = false;
  error: string | null = null;
  message: string | null = null;

  constructor(
    private service: FormService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private location: Location,
    private dialog: MatDialog,
    private formDialog: FormDialogService,
    private snackBar: MatSnackBar,
    @Optional() private dialogRef: MatDialogRef<FormManagerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.formGroup = this.fb.group({});
    this.formHandlers = {
      '001': (response) => handleForm001Response(response, this.router, this.authService)
      // add more special handlers here
    };
  }

  ngOnInit() {
    console.log(JSON.stringify(this.params));
    if (this.data) {
      this.formId = this.data.formId ?? this.formId;
      this.recordId = this.data.recordId ?? this.recordId;
      this.action = this.data.action ?? this.action;
      this.params = this.data.params ?? this.params;
    }
    this.loadForm();
  }

  loadForm(): void {
    this.error = null;

    this.service.loadForm(this.formId, this.action, this.recordId, this.params).subscribe({
      next: (response) => {
        if (!response.success) {
          console.error('loadForm failed:', response.message, response.errors);
        } else {
          const form = response.data?.form;
          if (form) {
            this.form = form;
            this.buildFormGroup();

            if (this.isViewMode) {
              this.formGroup.disable({emitEvent: false});
            }

            // this.debugFormValidity();
            this.header = this.form.header;
            this.componentLoaded = true;
            console.log(this.form);
          }
        }
      },
      error: (err) => {
        console.error('Error loading form:', err);

        // Default error message
        let message = 'Failed to submit form.';

        if (err?.error?.message) {
          message = err.error.message;
        } else if (err.status === 0) {
          // Network error, server unreachable
          message = 'Network error. Please check your connection.';
        }
        this.message = message;

        this.header = 'Error loading form';
        this.componentLoaded = true;
      }
    });
  }

  private buildFormGroup(): void {
    if (this.form?.formFields) {
      for (const control of this.form.formFields) {
        const validators = this.buildValidators(control);

        const fc = this.fb.nonNullable.control(
          {
            value: control.value ?? '',
            disabled: control.readonly,
          },
          {
            validators,
            updateOn: 'change',
          });

        this.formGroup.addControl(control.name, fc);
      }
    }
  }

  private buildValidators(control: any): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (control.requiredFlag === 'Y') {
      validators.push(Validators.required);
    }

    if (control.controlType === 'email') {
      validators.push(Validators.email);
    }

    if (control.minLength > 0) {
      validators.push(Validators.minLength(control.minLength));
    }

    if (control.maxLength > 0) {
      validators.push(Validators.maxLength(control.maxLength));
    }

    if (control.pattern) {
      validators.push(Validators.pattern(control.pattern));
    }

    return validators;
  }

  submitForm(): void {
    // this.componentLoaded = false;
    if (!this.form || !this.formGroup) {
      this.error = 'Form is not loaded.';
      return;
    }

    if (this.formGroup.invalid) {
      this.error = 'Form is invalid. Please fix errors.';
      return;
    }


    this.error = null;

    const payload = {
      recordId: this.recordId,
      ...this.formGroup.getRawValue()
    };

    this.service.submitForm(this.formId, this.recordId, payload).subscribe({
      next: (response) => {
        const data = response.data;
        if (response.success) {
          // this.storeJwtTokensIfPresent(response);  // ✅ catch login tokens here

          const handler = this.formHandlers[this.formId];
          if (handler) {
            handler(response);
          } else {
            console.log(`No post-submit handling defined for form ${this.formId}.`);
          }
          this.snackBar.open('Record updated', 'Close', {
            duration: 20000
          });

        }
        if (!this.inline) {
          this.dialogRef?.close(response);
        }
      },
      error: (err) => {
        // Default error message
        let message = 'Failed to submit form.';

        if (err?.error?.message) {
          message = err.error.message;
        } else if (err.status === 0) {
          // Network error, server unreachable
          message = 'Network error. Please check your connection.';
        }
        this.error = message;
        this.componentLoaded = true;
      }
    });
  }


  onCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close({
        success: false
      });
      return;
    }

    this.location.back();
  }

  onFormExtra(extra: FormExtra): void {
    const typeId = (extra?.type?.typeId || '').toLowerCase().trim();

    switch (typeId) {
      case TypeConstants.FORM_EXTRA_LINK:
        this.formDialog.switchFrom(this.dialogRef, extra.targetFormId, 'new');
        break;

      default:
        // fallback: emit event or log
        console.log(`Unknown extra: ${extra}`);
        break;
    }
  }

  private debugFormValidity(): void {
    console.log('FORM status=', this.formGroup.status, 'valid=', this.formGroup.valid);

    Object.entries(this.formGroup.controls).forEach(([name, ctrl]) => {
      if (ctrl.invalid) {
        console.log('INVALID CONTROL:', name, {
          value: ctrl.value,
          errors: ctrl.errors,
          status: ctrl.status,
          readonly: ctrl.disabled
        });
      }
    });
  }

  get isViewMode(): boolean {
    return this.action === 'view';
  }

  get matCardClass(): string {
    return this.inline
      ? 'form-card-inline mat-typography'
      : 'form-card mat-typography';
  }
}


