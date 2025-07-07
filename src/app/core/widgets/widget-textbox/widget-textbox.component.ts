import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {FormField} from '../../../models/form';

@Component({
  selector: 'app-widget-textbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './widget-textbox.component.html',
  styleUrl: './widget-textbox.component.scss'
})
export class WidgetTextboxComponent {
  @Input() field!: FormField;
  @Input() formGroup!: FormGroup;

  get inputType(): string {
    return this.field?.controlType?.toLowerCase() || 'text';
  }

}
