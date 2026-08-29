import {Component, Input} from '@angular/core';
import {GridManagerComponent} from '../../components/grid-manager/grid-manager.component';
import {GridConstants} from '../../../../constants/grid_constants';
import {DatePipe, NgIf, UpperCasePipe} from '@angular/common';
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
import {PageConstants} from '../../../../constants/page_constants';
import {NavigationService} from '../../../services/navigation.service';
import {MenuConstants} from '../../../../constants/menu_constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Form, FormField} from '../../../models/form';
import {EventConstants} from '../../../../constants/event_constants';

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
    UpperCasePipe
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

  header: string = '';
  message: string = '';

  constructor(
    private api: ApiService,
    private formDialogService: FormDialogService,
    private service: FormService,
    private navigationService: NavigationService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.loadReservation();
  }

  protected override onParamsLoaded(): void {
  }

  loadReservation(): void {
    this.componentLoaded = false;
    this.service.loadForm(this.formId, this.formAction, this.recordId, this.formParams).subscribe({
      next: response => {
        if (!response.success) {
          console.error(
            'loadReservationForm failed:',
            response.message,
            response.errors
          );
          return;
        }

        this.form = response.data?.form;

        if (this.form) {
          this.componentLoaded = true;
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
    return this.getFormFieldValue('event_id')!==EventConstants.CRUISE_NOT_SELECTED;
  }
}
