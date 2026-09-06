import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {WidgetSpinnerComponent} from '../widget-spinner/widget-spinner.component';
import {WidgetCounterComponent} from '../widget-counter/widget-counter.component';
import {FormField} from '../../../models/form';

@Component({
  selector: 'app-widget-reservation-room',
  imports: [
    ReactiveFormsModule,
    WidgetCounterComponent
  ],
  templateUrl: './widget-reservation-room.component.html',
  styleUrl: './widget-reservation-room.component.scss'
})
export class WidgetReservationRoomComponent {
  @Input() roomForm!: FormGroup;
  @Input() roomNumber!: number;

}
