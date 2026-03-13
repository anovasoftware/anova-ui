import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {FormField} from '../../models/form';
import {Subscription} from 'rxjs';

@Directive()
export abstract class WidgetBaseComponent implements OnInit, OnDestroy {
  @Input() field!: FormField;
  @Input() formGroup!: FormGroup;


  currentLength = 0;
  private valueSub?: Subscription;

  ngOnInit(): void {
    const control = this.formGroup.controls[this.field.name];

    this.currentLength = this.getLength(control?.value);

    this.valueSub = control?.valueChanges.subscribe((value) => {
      this.currentLength = this.getLength(value);
    });
  }

  ngOnDestroy(): void {
    this.valueSub?.unsubscribe();
  }

  private getLength(value: unknown): number {
    return typeof value === 'string' ? value.length : 0;
  }

  get rows(): number {
    return this.field?.rows || 5;
  }

  get minLength(): number {
    return this.field?.minLength || 0;
  }

  get maxLength(): any {
    return this.field.maxLength > 0 ? this.field.maxLength : null;

  }

  hasError(name: string, error: string): boolean {
    // const control = this.formGroup.get(name);
    const control = this.formGroup.controls[name];
    return !!control && control.hasError(error);
  }

  showErrors(name: string): boolean {
    // const control = this.formGroup.get(name);
    const control = this.formGroup.controls[name];
    return !!control && control.invalid && (control.touched || control.dirty);
  }

}
