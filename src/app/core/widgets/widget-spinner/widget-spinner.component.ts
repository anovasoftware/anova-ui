import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { WidgetBaseComponent } from '../widget-base.component';

@Component({
  selector: 'app-widget-spinner',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './widget-spinner.component.html',
  styleUrl: './widget-spinner.component.scss'
})
export class WidgetSpinnerComponent extends WidgetBaseComponent {

  get min(): number | null {
    return this.field?.minLength ?? null;
  }

  get max(): number | null {
    return this.field?.maxLength ?? null;
  }

  get step(): number {
    return 1;
  }
}
