import {Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {WidgetCounterComponent} from '../widget-counter/widget-counter.component';
import {FormField} from '../../../models/form';
import {NgIf} from '@angular/common';
import {FormService} from '../../../services/form.service';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ReservationRoomService} from '../../../services/res/reservation-room.service';

@Component({
  selector: 'app-widget-reservation-room',
  imports: [
    ReactiveFormsModule,
    WidgetCounterComponent,
    MatButton,
    NgIf,
    MatIcon
  ],
  templateUrl: './widget-reservation-room.component.html',
  styleUrl: './widget-reservation-room.component.scss'
})
export class WidgetReservationRoomComponent implements OnInit {
  @Input() roomForm!: FormGroup;
  @Input() roomNumber!: number;

  @Output() removeRoom = new EventEmitter<void>();

  adultCountField: FormField;
  childCountField: FormField;
  infantCountField: FormField;

  constructor(
    private formService: FormService,
    private reservationRoomService: ReservationRoomService
  ) {
    this.adultCountField = this.formService.createFormField('adult_count', 'Adults', {
        controlType: 'counter',
        minLength: 0,
        maxLength: 5
      }
    );

    this.childCountField = this.formService.createFormField('child_count', 'Children', {
        controlType: 'counter',
        minLength: 0,
        maxLength: 5
      }
    );

    this.infantCountField = this.formService.createFormField('infant_count', 'Infants', {
        controlType: 'counter',
        minLength: 0,
        maxLength: 5
      }
    );
  }

  ngOnInit(): void {
    this.subscribeToGuestCounts();
  }

  private destroyRef = inject(DestroyRef);
  private subscribeToGuestCounts(): void {
    ['adult_count', 'child_count', 'infant_count'].forEach(fieldName => {
      this.roomForm.get(fieldName)?.valueChanges.subscribe(() => {
        this.reservationRoomService.syncReservationRoomGuestCount(this.roomForm);
      });
    });
  }

  onRemoveRoom(): void {
    this.removeRoom.emit();
  }

  get reservationRoomGuests(): FormArray {
    return this.roomForm.get('reservation_room_guests') as FormArray;
  }
}
