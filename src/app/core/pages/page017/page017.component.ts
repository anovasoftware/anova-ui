import {Component, Input} from '@angular/core';
import {GridManagerComponent} from '../../components/grid-manager/grid-manager.component';
import {GridConstants} from '../../../../constants/grid_constants';
import {DatePipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {PageBaseComponent} from '../page-base/page-base.component';
import {MatButton} from '@angular/material/button';
import {FormConstants} from '../../../../constants/form_constants';
// import {FormDialogService} from '../../../services/form-dialog.service';
// import {ApiService} from '../../../services/api.service';
import {Client} from '../../../models/client';
import {TypeConstants} from '../../../../constants/type_constants';
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {Event} from '../../../models/event';
import {FormService} from '../../../services/form.service';
import {NavigationService} from '../../../services/navigation.service';
import {MenuConstants} from '../../../../constants/menu_constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Form, FormField} from '../../../models/form';
import {EventConstants} from '../../../../constants/event_constants';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {WidgetAutocompleteComponent} from '../../widgets/widget-autocomplete/widget-autocomplete.component';
import {ReservationRoom} from '../../../models/reservation-room';
import {ReservationRoomService} from '../../../services/res/reservation-room.service';
import {WidgetReservationRoomComponent} from '../../widgets/widget-reservation-room/widget-reservation-room.component';
import {MatIcon} from '@angular/material/icon';
import {WidgetSelect1Component} from '../../widgets/widget-select1/widget-select1.component';
import {WidgetReservationRoomGuestComponent} from '../../widgets/widget-reservation-room-guest/widget-reservation-room-guest.component';


@Component({
  selector: 'app-page017',
  imports: [
    NgIf,
    GridManagerComponent,
    MatStepper,
    MatStep,
    MatStepperNext,
    MatButton,
    MatStepperPrevious,
    DatePipe,
    UpperCasePipe,
    WidgetAutocompleteComponent,
    NgForOf,
    WidgetReservationRoomComponent,
    MatIcon,
    WidgetSelect1Component,
    WidgetReservationRoomGuestComponent,
  ],
  templateUrl: './page017.component.html',
  styleUrl: './page017.component.scss'
})
export class Page017Component extends PageBaseComponent {
  @Input() recordId: string = 'new';
  @Input() formAction = 'create';
  @Input() formParams?: any;

  protected readonly GridConstants = GridConstants;
  protected readonly FormConstants = FormConstants;
  protected readonly TypeConstants = TypeConstants;

  protected override tabIndexKey = 'tab-page017';
  record: Client | null = null;
  selectedEvent: Event | null = null;
  formId = FormConstants.BOOKING;
  form?: Form;
  reservationRooms: ReservationRoom[] = [];

  header: string = '';
  message: string = '';
  formGroup: FormGroup;
  categoryField!: FormField;


  constructor(
    // private api: ApiService,
    // private formDialogService: FormDialogService,
    private formService: FormService,
    private navigationService: NavigationService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private reservationRoomService: ReservationRoomService,
  ) {
    super();
    this.formGroup = this.fb.group({});
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.loadReservation();
  }

  protected override onParamsLoaded(): void {
  }

  private buildFormGroup(): void {
    if (this.form?.formFields) {
      for (const control of this.form.formFields) {
        const fc = this.fb.nonNullable.control(
          {
            value: control.value ?? '',
            disabled: control.readonly,
          },
          {
            updateOn: 'change',
          });

        this.formGroup.addControl(control.name, fc);
      }
    }
  }

  loadReservation(): void {
    this.componentLoaded = false;

    this.formService.loadForm(this.formId, this.formAction, this.recordId, this.formParams).subscribe({
      next: response => {
        if (!response.success) {
          console.error('loadReservationForm failed:', response.message, response.errors);
          return;
        }

        this.form = response.data?.form;
        this.buildFormGroup();

        if (this.form) {
          const reservationRoomField = this.getFormField('reservation_rooms');
          this.reservationRooms = reservationRoomField?.collection ?? [];
          this.categoryField = this.getFormField('category_id');

          this.reservationRoomService.syncRooms(
            this.formGroup,
            this.reservationRooms
          );
          this.subscribeToRoomCount();
          this.componentLoaded = true;
        }
      },
      error: err => {
        let message = 'Failed to load form.';

        if (err?.error?.message) {
          message = err.error.message;
        } else if (err.status === 0) {
          message =
            'Network error. Please check your connection.';
        }

        this.message = message;
        this.header = 'Error loading form';
        this.componentLoaded = false;

        this.snackBar.open(message, 'OK', {duration: 7000});

        this.exitPage();
      }
    });
  }

  get reservationRoomForms(): FormGroup[] {
    const rooms = this.formGroup.get('reservation_rooms') as FormArray;

    return rooms.controls as FormGroup[];
  }

  subscribeToRoomCount(): void {
    const roomCountControl = this.formGroup.get('room_count');

    if (roomCountControl) {
      roomCountControl.valueChanges.subscribe(value => {
        this.reservationRoomService.syncRoomCount(
          this.formGroup,
          Number(value || 1)
        );
      });
    }
  }

  getFormField(fieldName: string): any {
    return this.form?.formFields?.find(
      field => field.name === fieldName
    );
  }

  getFormFieldValue(fieldName: string): any {
    return this.form?.formFields?.find(
      field => field.name === fieldName
    )?.value;
  }

  setFormFieldValue(fieldName: string, value: any): void {
    const field = this.form?.formFields?.find(
      field => field.name === fieldName
    );

    if (field) {
      field.value = value;
    }
  }

  getSelectedDisplayValue(fieldName: string): string {
    const field = this.form?.formFields?.find(
      field => field.name === fieldName
    );

    return field?.dataOptions?.find(
      option => option.id === field.value
    )?.displayValue ?? '';
  }

  onEventSelected(event: any): void {
    this.selectedEvent = event.row;
    this.setFormFieldValue(
      'event_id',
      event.row.pk
    );
  }

  private exitPage(): void {
    this.navigationService.navigateToMenuId(MenuConstants.BOOKING_MANAGEMENT);
  }

  get eventSelected(): boolean {
    return this.getFormFieldValue('event_id') !== EventConstants.CRUISE_NOT_SELECTED;
  }


  get totalGuestCount(): number {
    return this.reservationRoomForms.reduce(
      (total, roomForm) =>
        total
        + Number(roomForm.get('adult_count')?.value ?? 0)
        + Number(roomForm.get('child_count')?.value ?? 0)
        + Number(roomForm.get('infant_count')?.value ?? 0),
      0
    );
  }

  get roomCount(): number {
    return Number(
      this.formGroup.get('room_count')?.value ?? 0
    );
  }


  // get roomNumbers(): number[] {
  //   return Array.from(
  //     {length: this.roomCount},
  //     (_, index) => index + 1
  //   );
  // }

  addRoom() {
    this.reservationRoomService.addRoom(this.formGroup);
  }

  removeRoom(index: number) {
    this.reservationRoomService.removeRoom(this.formGroup, index)
  }

  getCategoryDescription(roomForm: FormGroup): string {
    const categoryId = roomForm.get('category_id')?.value;

    if (!categoryId) {
      return 'Not selected';
    }

    const option = this.categoryField.dataOptions?.find(
      option => option.id === categoryId
    );
    return option?.displayValue ?? categoryId;
  }
}
