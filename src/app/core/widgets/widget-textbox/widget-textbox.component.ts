import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {FormField} from '../../../models/form';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TypeConstants} from '../../../../constants/type_constants';

@Component({
  selector: 'app-widget-textbox',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './widget-textbox.component.html',
  styleUrl: './widget-textbox.component.scss'
})
export class WidgetTextboxComponent {
  @Input() field!: FormField;
  @Input() formGroup!: FormGroup;

  protected readonly TypeConstants = TypeConstants;

  get inputType(): string {
    return this.field?.controlType?.toLowerCase() || 'text';
  }


  hasError(name: string, error: string): boolean {
    const control = this.formGroup.get(name);
    return !!control && control.hasError(error);
  }
}
