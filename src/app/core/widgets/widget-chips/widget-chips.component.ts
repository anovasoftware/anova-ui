import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {WidgetBaseComponent} from '../widget-base.component';
import {MatChipListbox, MatChipOption} from '@angular/material/chips';

@Component({
  selector: 'app-widget-chips',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipListbox,
    MatChipOption
  ],
  templateUrl: './widget-chips.component.html',
  styleUrl: './widget-chips.component.scss'
})

export class WidgetChipsComponent extends WidgetBaseComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();

    this.control.setValue(this.field.dataOptionsSelected ?? []);
  }

  get options(): any[] {
    return this.field?.dataOptions ?? [];
  }

  isSelected(option: any): boolean {
    const selectedValues = this.control.value ?? [];
    return selectedValues.includes(option.id);
  }

  toggleOption(option: any): void {
    if (option.disabledFlag || this.field.readonly) {
      return;
    }

    const selectedValues = this.control.value ?? [];

    const newValues = selectedValues.includes(option.id)
      ? selectedValues.filter((id: string) => id !== option.id)
      : [...selectedValues, option.id];

    this.control.setValue(newValues);
    this.control.markAsDirty();
    this.control.markAsTouched();
  }
}
