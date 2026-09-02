import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {WidgetBaseComponent} from '../widget-base.component';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {DataOption} from '../../../models/form';
import {MatIcon} from '@angular/material/icon';
import {FormDialogService} from '../../../services/form-dialog.service';

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
    MatOption,
    MatIcon
  ],
  templateUrl: './widget-autocomplete.component.html',
  styleUrl: './widget-autocomplete.component.scss'
})
export class WidgetAutocompleteComponent extends WidgetBaseComponent {
  readonly CREATE_NEW = '__CREATE_NEW__';
  filteredOptions: DataOption[] = [];
  searchControl = new FormControl('');
  private formDialogService = inject(FormDialogService);

  override ngOnInit(): void {
    super.ngOnInit();

    this.filteredOptions = this.field.dataOptions ?? [];

    this.searchControl.valueChanges.subscribe(value => {
      const search = typeof value === 'string' ? value.trim().toLowerCase() : '';

      if (search.length < 3) {
        this.filteredOptions = [];
      } else {
        this.filteredOptions = (this.field.dataOptions ?? []).filter(
          option => option.displayValue.toLowerCase().includes(search)
        );
      }
    });
  }

  optionSelected(option: DataOption | string): void {
    if (option === this.CREATE_NEW) {
      this.createNewRecord();
      return;
    }

    const dataOption = option as DataOption;

    this.formGroup.get(this.field.name)?.setValue(dataOption.id);

    this.searchControl.setValue(
      dataOption.displayValue,
      {emitEvent: false}
    );
  }

  createNewRecord(): void {
    if (!this.field.dataSourceFormId) {
      return;
    }

    this.formDialogService.openForm(
      this.field.dataSourceFormId,
      'new',
      'create',
      null
    );
  }
}
