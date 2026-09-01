import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {Guest} from '../../../models/guest';



@Component({
  selector: 'app-widget-guest-collection',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './widget-guest-collection.component.html',
  styleUrl: './widget-guest-collection.component.scss'
})
export class WidgetGuestCollectionComponent implements OnChanges {

  @Input() guests: Guest[] = [];

  guestForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.guestForm = this.fb.group({
      guests: this.fb.array([])
    });
  }

  get guestArray(): FormArray {
    return this.guestForm.get('guests') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['guests']) {
      this.buildGuestForm();
    }
  }

  private buildGuestForm(): void {
    this.guestArray.clear();

    for (const guest of this.guests) {
      this.guestArray.push(
        this.createGuestFormGroup(guest)
      );
    }
  }

  private createGuestFormGroup(guest: Guest): FormGroup {
    return this.fb.group({
      guestId: [guest.guestId],
      statusId: [guest.statusId],
      guestTypeId: [guest.guestTypeId],
      bookingFirstName: [guest.bookingFirstName ?? ''],
      bookingLastName: [guest.bookingLastName ?? '']
    });
  }
}
