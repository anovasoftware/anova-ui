import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ReservationPricing, ReservationRoomGuestPricing} from '../../../../models/event-category-price';
import {CurrencyPipe, JsonPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {Lookups} from '../../../../models/grid';
import {LookupService} from '../../../../services/lookup.service';
import {PricingContext} from '../page017.component';
import {ReservationRoom} from '../../../../models/reservation-room';
import {ReservationPrice} from '../../../../models/reservation-price';

@Component({
  selector: 'app-pricing',
  imports: [
    CurrencyPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
  ],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent implements OnChanges {
  @Input() pricingContext!: PricingContext;

  constructor(
    public lookupService: LookupService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pricingContext']) {
      console.log(
        'PRICING COMPONENT - NEW CONTEXT:',
        this.pricingContext
      );
    }
  }

  get reservationPricing(): ReservationPricing | null {
    return this.pricingContext?.reservationPricing ?? null;
  }

  get reservationRooms(): ReservationRoom[] {
    return this.pricingContext?.reservationRooms ?? [];
  }

  get reservationPrices(): ReservationPrice[] {
    return this.pricingContext?.reservationPrices ?? [];
  }

  get lookups(): Lookups {
    return this.pricingContext?.lookups ?? {};
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

  getGuestDisplayName(roomNumber: string, guestNumber: string): string {
    const room = this.reservationRooms.find(
      r => r.orderBy === roomNumber
    );

    const guest = room?.reservationRoomGuests?.find(
      g => g.guestNumber === guestNumber
    );

    const name = [
      guest?.bookingFirstName?.trim(),
      guest?.bookingLastName?.trim()
    ]
      .filter(Boolean)
      .join(' ');

    return name || `Guest ${guestNumber}`;
  }

  // getOccupancyTypeDescription(occupancyTypeId: string): string {
  //   return this.lookupService.getDescription(
  //     this.lookups,
  //     'occupancyType',
  //     occupancyTypeId
  //   );
  // }
  getLookupDescription(lookupName: string, id: string): string {
    return this.lookupService.getDescription(
      this.lookups,
      lookupName,
      id
    );
  }
}
