import {Component, Input} from '@angular/core';
import {AbstractControl, FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {TypeConstants} from '../../../../constants/type_constants';

@Component({
  selector: 'app-widget-reservation-room-guest',
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput
  ],
  templateUrl: './widget-reservation-room-guest.component.html',
  styleUrl: './widget-reservation-room-guest.component.scss'
})
export class WidgetReservationRoomGuestComponent {
  @Input() roomForm!: FormGroup;
  @Input() roomNumber!: number;

  get reservationRoomGuests(): FormArray {
    return this.roomForm.get(
      'reservation_room_guests'
    ) as FormArray;
  }

  asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  getGuestLabel(index: number): string {
    const guests = this.reservationRoomGuests.controls;
    const guest = guests[index];

    const occupancyTypeId =
      guest.get('occupancy_type_id')?.value;

    let label = 'Guest';

    switch (occupancyTypeId) {
      case TypeConstants.RESERVATION_ROOM_GUEST_ADULT:
        label = 'Adult';
        break;

      case TypeConstants.RESERVATION_ROOM_GUEST_CHILD:
        label = 'Child';
        break;

      case TypeConstants.RESERVATION_ROOM_GUEST_INFANT:
        label = 'Infant';
        break;
    }

    const typeNumber = guests
      .slice(0, index + 1)
      .filter(g =>
        g.get('occupancy_type_id')?.value === occupancyTypeId
      )
      .length;

    return `${label} ${typeNumber}`;
  }


}
