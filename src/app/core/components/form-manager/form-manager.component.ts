import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Location} from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControlOptions, ValidatorFn
} from '@angular/forms';
import {FormService} from '../../../services/form.service';
import {Form, FormExtra} from '../../../models/form';
import {WidgetTextboxComponent} from '../../widgets/widget-textbox/widget-textbox.component';
import {TypeConstants} from '../../../../constants/type_constants';
import {FormExtraConstants} from '../../../../constants/form_extra_constants';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {handleForm001Response} from '../../../form-handlers/form001.handler';
import {AuthService} from '../../../services/auth.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormConstants} from '../../../../constants/form_constants';
import {FormDialogService} from '../../../services/form-dialog.service';
import {WidgetTextareaComponent} from '../../widgets/widget-textarea/widget-textarea.component';


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
  ],
  templateUrl: './form-manager.component.html',
  styleUrl: './form-manager.component.scss'
})
export class FormManagerComponent implements OnInit {
  @Input() formId!: string;
  @Input() recordId!: string;
  @Input() action = 'create';
  @Input() params?: any;

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

    this.service.loadForm(this.formId, this.action, this.recordId).subscribe({
      next: (response) => {
        if (!response.success) {
          console.error('loadForm failed:', response.message, response.errors);
        } else {
          const form = response.data?.form;
          if (form) {
            this.form = form;
            this.buildFormGroup();

            //   if (this.form.readonly) {
            //    this.formGroup.disable({ emitEvent: false });
            // }

            // this.debugFormValidity();
            this.header = this.form.header;
            this.componentLoaded = true;
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
        console.log(message);

        this.header = 'Error loading form';
        this.componentLoaded = true;
      }
    });
  }

  private buildFormGroup(): void {
    if (!this.form?.formFields) {
      return;
    }

    for (const control of this.form.formFields) {
      const validators = this.buildValidators(control);

      const fc = this.fb.nonNullable.control(control.value ?? '', {
        validators,
        updateOn: 'change',
      });

      this.formGroup.addControl(control.name, fc);
      // const validators = this.buildValidators(control);
      // // const options = validators.length ? { validators } as AbstractControlOptions: undefined;
      // const options = validators.length
      //   ? {validators: validators as ValidatorFn[]}
      //   : undefined;
      //
      // const fc = this.fb.nonNullable.control(control.value, options);
      // // if (control.disabled) {
      // //   fc.disable({ emitEvent: false });
      // // }
      // this.formGroup.addControl(control.name, fc);
      // // this.formGroup.addControl(
      // //   control.name,
      // //   this.fb.nonNullable.control(control.value, options)
      // // );
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
    this.componentLoaded = false;
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
      ...this.formGroup.value
    };

    this.service.submitForm(this.formId, payload).subscribe({
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
        }
        this.dialogRef?.close(response);
        // this.componentLoaded = true;
        // Handle success
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
        console.log(message);

        this.error = message;
        this.componentLoaded = true;
      }
    });
  }

  // private storeJwtTokensIfPresent(response: any): void {
  //   const access = response?.data?.access;
  //   const refresh = response?.data?.refresh;
  //
  //   if (access) localStorage.setItem('access_token', access);
  //   if (refresh) localStorage.setItem('refresh_token', refresh);
  //
  //   // optional: if your API also returns a user object
  //   const user = response?.data?.user;
  //   if (user) localStorage.setItem('user', JSON.stringify(user));
  // }


  onCancel() {
    this.location.back();
  }

  onFormExtra(extra: FormExtra): void {
    const typeId = (extra?.type?.typeId || '').toLowerCase().trim();

    switch (typeId) {
      case TypeConstants.FORM_EXTRA_LINK:
        this.formDialog.switchFrom(this.dialogRef, extra.targetFormId, 'new');
        // // this.location.back();
        // this.dialogRef?.close();
        // this.dialog.open(FormManagerComponent, {
        //   width: '500px',
        //   maxWidth: '90vw',
        //   data: { formId: extra.targetFormId, pk: 'new' }
        // });
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

}


