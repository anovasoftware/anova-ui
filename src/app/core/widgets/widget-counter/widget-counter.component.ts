import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { WidgetBaseComponent } from '../widget-base.component';

@Component({
  selector: 'app-widget-counter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './widget-counter.component.html',
  styleUrl: './widget-counter.component.scss'
})
export class WidgetCounterComponent extends WidgetBaseComponent {

  get value(): number {
    return Number(this.control?.value ?? 0);
  }

  get min(): number {
    return this.field?.minLength ?? 0;
  }

  get max(): number | null {
    return this.field?.maxLength > 0
      ? this.field.maxLength
      : null;
  }

  get atMinimum(): boolean {
    return this.value <= this.min;
  }

  get atMaximum(): boolean {
    return this.max !== null && this.value >= this.max;
  }

  decrement(): void {
    if (this.field.readonly || this.atMinimum) {
      return;
    }

    this.control.setValue(this.value - 1);
    this.control.markAsDirty();
    this.control.markAsTouched();
  }

  increment(): void {
    if (this.field.readonly || this.atMaximum) {
      return;
    }

    this.control.setValue(this.value + 1);
    this.control.markAsDirty();
    this.control.markAsTouched();
  }
}
