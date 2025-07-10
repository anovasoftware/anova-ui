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
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-form-manager',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WidgetTextboxComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
  ],
  templateUrl: './form-manager.component.html',
  styleUrl: './form-manager.component.scss'
})
export class FormManagerComponent implements OnInit {
  @Input() formId!: string;
  @Input() pk!: string;
  @Input() action?: string;
  @Input() params?: any;

  // The loaded form metadata (from your service)
  form?: Form;

  // The reactive form group
  formGroup: FormGroup;

  loading = false;
  error: string | null = null;

  constructor(
    private service: FormService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({});
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
        this.error = 'Failed to load form.';
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
        console.log('Submission response:', response);
        this.loading = false;
        // Handle success
      },
      error: (err) => {
        console.error('Error submitting form:', err);
        this.error = 'Failed to submit form.';
        this.loading = false;
      }
    });
  }

  protected readonly TypeConstants = TypeConstants;
}


