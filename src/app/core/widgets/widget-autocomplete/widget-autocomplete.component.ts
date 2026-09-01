import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {WidgetBaseComponent} from '../widget-base.component';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {DataOption} from '../../../models/form';

@Component({
  selector: 'app-widget-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption
  ],
  templateUrl: './widget-autocomplete.component.html',
  styleUrl: './widget-autocomplete.component.scss'
})
export class WidgetAutocompleteComponent extends WidgetBaseComponent {
  filteredOptions: DataOption[] = [];
  searchControl = new FormControl('');

  override ngOnInit(): void {
    super.ngOnInit();

    this.filteredOptions = this.field.dataOptions ?? [];

    this.searchControl.valueChanges.subscribe(value => {
      const search = typeof value === 'string' ? value.trim().toLowerCase(): '';

      if (search.length < 3) {
        this.filteredOptions = [];
      }
      else {
        this.filteredOptions = (this.field.dataOptions ?? []).filter(
          option => option.displayValue.toLowerCase().includes(search)
        );
      }
    });
  }

  optionSelected(option: DataOption): void {
    this.formGroup.get(this.field.name)?.setValue(option.id);

    this.searchControl.setValue(
      option.displayValue,
      {emitEvent: false}
    );
  }
}
