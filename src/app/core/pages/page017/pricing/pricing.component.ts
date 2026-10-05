import {Component, Input} from '@angular/core';
import {ReservationPricing} from '../../../../models/event-category-price';
import {CurrencyPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {Lookups} from '../../../../models/grid';
import {LookupService} from '../../../../services/lookup.service';

@Component({
  selector: 'app-pricing',
  imports: [
    CurrencyPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent
  ],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  @Input() reservationPricing: ReservationPricing | null = null;
  @Input() lookups: Lookups = {}

  constructor(
    public lookupService: LookupService
  ) {
  }

  getTotal(): number {
    if (!this.reservationPricing) {
      return 0;
    }

    return this.reservationPricing.reservationRooms.reduce(
      (total, room) =>
        total +
        room.reservationRoomGuests.reduce(
          (roomTotal, guest) =>
            roomTotal +
            Number(guest.eventCategoryPrice.price),
          0
        ),
      0
    );
  }

}
