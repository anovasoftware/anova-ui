import {Component, ElementRef, ViewChild} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {GangwayService} from '../../../services/res/gangway.service';
import {Observable} from 'rxjs';
import {NgClass, NgForOf} from '@angular/common';
import {Type} from '../../../models/type';
import {Status} from '../../../models/status';
import {StatusConstants} from '../../../../constants/status_constants';
import {TypeConstants} from '../../../../constants/type_constants';

export interface Counter {
  typeId: string;
  statusId: string;
  count: number;
}


@Component({
  selector: 'app-page005',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './page005.component.html',
  styleUrl: './page005.component.scss'
})
export class Page005Component {
  protected readonly StatusConstants = StatusConstants;
  protected readonly TypeConstants = TypeConstants;

  dashboard$!: Observable<any>;
  guestTypes: Type[] = [];
  guestStatuses: Status[] = [];
  counters: Counter[] = [];

  @ViewChild('rfidInput') rfidInput!: ElementRef<HTMLInputElement>;

  // statusCards = [
  //   {
  //     statusId: StatusConstants.GUEST_ONBOARD,
  //     cssClass: 'onboard-card'
  //   },
  //   {
  //     statusId: StatusConstants.GUEST_ASHORE,
  //     cssClass: 'ashore-card'
  //   },
  //   {
  //     statusId: StatusConstants.GUEST_ARRIVING,
  //     cssClass: 'neutral-card'
  //   },
  //   {
  //     statusId: StatusConstants.GUEST_DISEMBARKED,
  //     cssClass: 'neutral-card'
  //   },
  //   {
  //     statusId: 'TOT',
  //     cssClass: 'neutral-card'
  //   },
  //
  //   // {
  //   //   statusId: StatusConstants.GUEST_ONBOARD,
  //   //   cssClass: 'neutral-card'
  //   // },
  //
  // ];

  constructor(
    protected globalService: GlobalService,
    private gangwayService: GangwayService,
  ) {
  }
  ngAfterViewInit(): void {
    this.focusRfidInput();
  }
  ngOnInit(): void {
    this.dashboard$ = this.gangwayService.dashboard$;

    this.globalService.currentHotelId$.subscribe(hotelId => {
      if (hotelId) {
        this.gangwayService.loadDashboard(hotelId);
      }
    });
    this.gangwayService.dashboard$.subscribe(dashboard => {
      this.guestTypes = dashboard?.lookups?.guestTypes ?? [];
      this.guestStatuses = dashboard?.lookups?.guestStatuses ?? [];
      this.counters = dashboard?.counters ?? [];
    });
  }
  focusRfidInput(): void {
    setTimeout(() => {
      this.rfidInput?.nativeElement?.focus();
    });
  }


  onRfidRead(value: string): void {
    const rfidUid = (value || '').trim();

    this.rfidInput.nativeElement.value = '';
    console.log(rfidUid);

    if (!rfidUid) {
      this.focusRfidInput();
      return;
    }

    // this.gangwayService.processRfidRead(rfidUid).subscribe({
    //   next: () => {
    //     this.loadDashboard(true);
    //     this.focusRfidInput();
    //   },
    //   error: () => {
    //     this.focusRfidInput();
    //   }
    // });
  }

  getTotalByStatus(statusId: string): number {
    return this.counters
      .filter(counter => counter.statusId === statusId)
      .reduce((total, counter) => total + Number(counter.count || 0), 0);
  }

  getCount(typeId: string, statusId: string): number {
    const counter = this.counters.find(row =>
      row.typeId === typeId && row.statusId === statusId
    );

    return counter?.count ?? 0;
  }

  getStatusDescription(statusId: string): string {
    const status = this.guestStatuses.find(row =>
      row.statusId === statusId
    );

    return status?.description ?? statusId;
  }

  getStatusCssClass(statusId: string): string {
    const status = this.guestStatuses.find(row =>
      row.statusId === statusId
    );

    return status?.cssClass ?? '';
  }

  summaryStatuses(): Status[] {
    return this.guestStatuses.filter(status =>
      [
        StatusConstants.GUEST_ONBOARD,
        StatusConstants.GUEST_ASHORE,
        'TOT'
      ].includes(status.statusId)
    );
  }
}
