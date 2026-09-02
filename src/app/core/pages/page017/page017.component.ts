import {Component, Input} from '@angular/core';
import {GridManagerComponent} from '../../components/grid-manager/grid-manager.component';
import {GridConstants} from '../../../../constants/grid_constants';
import {DatePipe, NgForOf, NgIf, NgSwitchCase, UpperCasePipe} from '@angular/common';
import {PageBaseComponent} from '../page-base/page-base.component';
import {MatButton} from '@angular/material/button';
import {FormConstants} from '../../../../constants/form_constants';
import {FormDialogService} from '../../../services/form-dialog.service';
import {ApiService} from '../../../services/api.service';
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
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {WidgetCounterComponent} from '../../widgets/widget-counter/widget-counter.component';
import {WidgetCollectionComponent} from '../../widgets/widget-collection/widget-collection.component';
import {Guest} from '../../../models/guest';
import {StatusConstants} from '../../../../constants/status_constants';
import {WidgetGuestCollectionComponent} from '../../widgets/widget-guest-collection/widget-guest-collection.component';
import {WidgetAutocompleteComponent} from '../../widgets/widget-autocomplete/widget-autocomplete.component';


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
    WidgetCounterComponent,
    WidgetGuestCollectionComponent,
    WidgetAutocompleteComponent,
    NgForOf,
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
  protected readonly EventConstants = EventConstants;

  protected override tabIndexKey = 'tab-page017';
  record: Client | null = null;
  selectedEvent: Event | null = null;
  formId = FormConstants.BOOKING;
  form?: Form;
  guests: Guest[] = [];

  header: string = '';
  message: string = '';
  formGroup: FormGroup;


  constructor(
    private api: ApiService,
    private formDialogService: FormDialogService,
    private formService: FormService,
    private navigationService: NavigationService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
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
          console.error(
            'loadReservationForm failed:',
            response.message,
            response.errors
          );
        } else {
          this.form = response.data?.form;
          this.buildFormGroup();

          if (this.form) {
            console.log(this.form);

            // this.guests = this.getFormFieldValue('guests').get('collection');
            const guestField = this.getFormField('guests');
            this.guests = guestField?.collection ?? [];
            this.syncGuestCollection();
            this.subscribeToGuestCounts();
            this.componentLoaded = true;
          }
        }
      },
      error: (err) => {
        let message = 'Failed to load form.';

        if (err?.error?.message) {
          message = err.error.message;
        } else if (err.status === 0) {
          message = 'Network error. Please check your connection.';
        }
        this.message = message;
        this.header = 'Error loading form';
        this.componentLoaded = false;
        this.snackBar.open(message, 'OK', {
          duration: 7000
        });

        this.exitPage();
      }
    });
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
    return Number(this.formGroup.get('adult_count')?.value ?? 0)
      + Number(this.formGroup.get('child_count')?.value ?? 0)
      + Number(this.formGroup.get('infant_count')?.value ?? 0);
  }


  private syncGuestCollection(): void {
    const adultCount = Number(this.formGroup.get('adult_count')?.value ?? 0);
    const childCount = Number(this.formGroup.get('child_count')?.value ?? 0);
    const infantCount = Number(this.formGroup.get('infant_count')?.value ?? 0);

    const requiredTypes = [
      ...Array(adultCount).fill('adult'),
      ...Array(childCount).fill('child'),
      ...Array(infantCount).fill('infant')
    ];

    while (this.guests.length < requiredTypes.length) {
      this.guests.push(
        this.createEmptyGuest(
          requiredTypes[this.guests.length]
        )
      );
    }

    while (this.guests.length > requiredTypes.length) {
      this.guests.pop();
    }

    this.guests.forEach((guest, index) => {
      if (!guest.guestId) {
        guest.guestTypeId = requiredTypes[index];
      }
    });
    // Important: give the child component a new array reference
    this.guests = [...this.guests];
  }

  private createEmptyGuest(guestTypeId: string): Guest {
    return {
      guestId: '',
      statusId: StatusConstants.ACTIVE,
      guestTypeId,
      bookingFirstName: '',
      bookingMiddleName: '',
      bookingLastName: '',
      bookingSuffix: '',
      birthDate: '',
      genderTypeId: ''
    };
  }

  get roomCount(): number {
    return Number(
      this.formGroup.get('room_count')?.value ?? 0
    );
  }


  get roomNumbers(): number[] {
    return Array.from(
      {length: this.roomCount},
      (_, index) => index + 1
    );
  }

  private subscribeToGuestCounts(): void {
    const fields = [
      'adult_count',
      'child_count',
      'infant_count'
    ];

    for (const fieldName of fields) {
      this.formGroup.get(fieldName)?.valueChanges.subscribe(() => {
          this.syncGuestCollection();
        });
    }
  }
}
