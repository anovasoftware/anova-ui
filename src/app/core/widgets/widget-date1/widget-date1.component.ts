import {Component} from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {WidgetBaseComponent} from '../widget-base.component';

@Component({
  selector: 'app-widget-date1',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './widget-date1.component.html',
  styleUrl: './widget-date1.component.scss'
})
export class WidgetDate1Component extends WidgetBaseComponent {
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    if (!['+', '-', 'm', 'M', 'h', 'H', 'y', 'Y', 'r', 'R', 't', 'T'].includes(key)) {
      return;
    }

    event.preventDefault();

    const control = this.formGroup.get(this.field.name);
    if (!control) {
      return;
    }

    const currentDate = this.parseDate(control.value) || new Date();

    let newDate = currentDate;

    switch (key) {
      case '+':
        newDate = this.addDays(currentDate, 1);
        break;

      case '-':
        newDate = this.addDays(currentDate, -1);
        break;

      case 'm':
      case 'M':
        newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        break;

      case 'h':
      case 'H':
        newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        break;

      case 'y':
      case 'Y':
        newDate = new Date(currentDate.getFullYear(), 0, 1);
        break;

      case 'r':
      case 'R':
        newDate = new Date(currentDate.getFullYear(), 11, 31);
        break;
      case 't':
      case 'T':
        newDate = new Date();
        break;

    }

    control.setValue(this.formatDate(newDate));
    control.markAsDirty();
    control.markAsTouched();
  }

  private parseDate(value: string): Date | null {
    if (!value) {
      return null;
    }

    const parts = value.split('-');

    if (parts.length !== 3) {
      return null;
    }

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    if (!year || !month || !day) {
      return null;
    }

    return new Date(year, month - 1, day);
  }

  private addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  private formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  onDateInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    let digits = input.value.replace(/\D/g, '');

    if (digits.length > 8) {
      digits = digits.substring(0, 8);
    }

    let formatted = digits;

    if (digits.length > 4) {
      formatted = digits.substring(0, 4) + '-' + digits.substring(4);
    }

    if (digits.length > 6) {
      formatted =
        digits.substring(0, 4) +
        '-' +
        digits.substring(4, 6) +
        '-' +
        digits.substring(6);
    }

    input.value = formatted;

    const control = this.formGroup.get(this.field.name);
    if (control) {
      control.setValue(formatted, {emitEvent: false});
      control.markAsDirty();
    }
  }
}
