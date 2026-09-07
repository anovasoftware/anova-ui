import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {WidgetSpinnerComponent} from '../widget-spinner/widget-spinner.component';
import {WidgetCounterComponent} from '../widget-counter/widget-counter.component';
import {FormField} from '../../../models/form';
import {JsonPipe, NgIf} from '@angular/common';
import {FormService} from '../../../services/form.service';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-widget-reservation-room',
  imports: [
    ReactiveFormsModule,
    WidgetCounterComponent,
    JsonPipe,
    MatButton,
    NgIf,
    MatIcon
  ],
  templateUrl: './widget-reservation-room.component.html',
  styleUrl: './widget-reservation-room.component.scss'
})
export class WidgetReservationRoomComponent {
  @Input() roomForm!: FormGroup;
  @Input() roomNumber!: number;

  @Output() removeRoom = new EventEmitter<void>();


  adultCountField: FormField;
  childCountField: FormField;
  infantCountField: FormField;

  constructor(
    private formService: FormService
  ) {
    this.adultCountField = this.formService.createFormField('adult_count', 'Adults', {
        controlType: 'counter',
        minLength: 0,
        maxLength: 5
      }
    );

    this.childCountField = this.formService.createFormField(
      'child_count',
      'Children',
      {
        controlType: 'counter',
        minLength: 0,
        maxLength: 5
      }
    );

    this.infantCountField = this.formService.createFormField(
      'infant_count',
      'Infants',
      {
        controlType: 'counter',
        minLength: 0,
        maxLength: 5
      }
    );
  }

  onRemoveRoom(): void {
    console.log('emitting...');
    this.removeRoom.emit();
  }
}
