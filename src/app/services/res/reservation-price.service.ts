import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ReservationPricing} from '../../models/event-category-price';

@Injectable({
  providedIn: 'root'
})
export class ReservationPriceService {

  constructor(private fb: FormBuilder) {
  }

  syncReservationPrices(
    formGroup: FormGroup,
    reservationPricing: ReservationPricing
  ): void {

    let prices = formGroup.get('reservation_prices');

    if (!(prices instanceof FormArray)) {
      prices = new FormArray([]);
      formGroup.setControl('reservation_prices', prices);
    }

    const priceArray = prices as FormArray;

    priceArray.clear();

    for (const roomPricing of reservationPricing.reservationRooms) {
      for (const guestPricing of roomPricing.reservationRoomGuests) {
        const ecp = guestPricing.eventCategoryPrice;

        priceArray.push(
          this.fb.group({
            reservation_price_id: [''],
            type_id: [ecp.typeId],
            status_id: ['001'],

            room_number: [roomPricing.roomNumber],
            guest_number: [guestPricing.guestNumber],

            currency_id: [ecp.currencyId],

            quantity: [1],
            price: [ecp.price],
            amount: [ecp.price]
          })
        );
      }
    }
  }
}
