import {EventCategoryPriceAuto} from '../models-auto/res/event-category-price.model';

export interface EventCategoryPrice extends EventCategoryPriceAuto {
  // Additional front-end properties when needed
}

export interface ReservationRoomGuestPricing {
  guestNumber: string;
  eventCategoryPrice: EventCategoryPrice;
}

export interface ReservationRoomPricing {
  roomNumber: string;
  categoryId: string;
  reservationRoomGuests: ReservationRoomGuestPricing[];
}

export interface ReservationPricing {
  reservationRooms: ReservationRoomPricing[];
}
