import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControlOptions, ValidatorFn
} from '@angular/forms';
import {FormService} from '../../../services/form.service';
import {Form} from '../../../models/form';
import {WidgetTextboxComponent} from '../../widgets/widget-textbox/widget-textbox.component';
import {TypeConstants} from '../../../../constants/type_constants';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {handleForm001Response} from '../../../form-handlers/form001.handler';
import {AuthService} from '../../../services/auth.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

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
  ],
  templateUrl: './form-manager.component.html',
  styleUrl: './form-manager.component.scss'
})
export class FormManagerComponent implements OnInit {
  @Input() formId!: string;
  @Input() pk!: string;
  @Input() action?: string;
  @Input() params?: any;

  protected readonly formHandlers: { [formId: string]: (response: any) => void } = {};
  protected readonly TypeConstants = TypeConstants;
  // The loaded form metadata (from your service)
  form?: Form;

  // The reactive form group
  formGroup: FormGroup;

  loading = false;
  error: string | null = null;

  constructor(
    private service: FormService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formGroup = this.fb.group({});
        this.formHandlers = {
          '001': (response) => handleForm001Response(response, this.router, this.authService)
      // add more special handlers here
    };
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(): void {
    this.loading = true;
    this.error = null;

    this.service.loadForm(this.formId).subscribe({
      next: (response) => {
        this.form = response.form;
        this.loading = false;
        // console.log('Loaded form:', this.form);

        // Build form controls dynamically
        this.buildFormGroup();
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
        console.log(message);
        this.loading = false;
      }
    });
  }

  private buildFormGroup(): void {
    if (!this.form?.formFields) {
      return;
    }

    for (const control of this.form.formFields) {
      const validators = this.buildValidators(control);
      // const options = validators.length ? { validators } as AbstractControlOptions: undefined;
      const options = validators.length
        ? {validators: validators as ValidatorFn[]}
        : undefined;


      this.formGroup.addControl(
        control.name,
        this.fb.nonNullable.control(control.value, options)
      );
    }

  }

  private buildValidators(control: any): Validators[] {
    const validators = [];

    if (control.requiredFlag === 'Y') {
      validators.push(Validators.required);
    }

    if (control.controlType === 'email') {
      validators.push(Validators.email);
    }

    // if (control.minLength) {
    //   validators.push(Validators.minLength(control.minLength));
    // }
    //
    // if (control.maxLength) {
    //   validators.push(Validators.maxLength(control.maxLength));
    // }
    // if (control.pattern) {
    //   validators.push(Validators.pattern(control.pattern));
    // }

    return validators;
  }


  submitForm(): void {
    if (!this.form || !this.formGroup) {
      this.error = 'Form is not loaded.';
      return;
    }

    if (this.formGroup.invalid) {
      this.error = 'Form is invalid. Please fix errors.';
      return;
    }

    this.loading = true;
    this.error = null;

    const payload = {
      pk: this.pk,
      ...this.formGroup.value
    };

    this.service.submitForm(this.formId, payload).subscribe({
      next: (response) => {
        const data = response.data;
        if (response.result === 'success') {
          const handler = this.formHandlers[this.formId];
          if (handler) {
            handler(response);
          // } else {
          //   this.handleCrudFormResponse(response);
          } else {
            console.log(`No post-submit handling defined for form ${this.formId}.`);
          }
        }
        // if (response.result === 'success') {
        //   if (response.access) {
        //     localStorage.setItem('access_token', response.access);
        //   }
        //   if (response.refresh) {
        //     localStorage.setItem('refresh_token', response.refresh);
        //   }
        //   if (data.redirect) {
        //     console.log(data.redirect);
        //     this.router.navigate([data.redirect]);
        //   } else {
        //     // Optionally do something else if no redirect provided
        //     console.log('No redirect path specified by backend.');
        //   }
        // }
        this.loading = false;
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
        this.loading = false;
      }
    });
  }
}


