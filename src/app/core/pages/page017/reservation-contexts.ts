import {ReservationRoom} from "../../../models/reservation-room";
import {ReservationPrice} from "../../../models/reservation-price";
import {ReservationPricing} from "../../../models/event-category-price";
import {Event} from "../../../models/event.model";
import {Lookups} from "../../../models/grid";
import {ReservationSnake} from '../../../models/reservation.model';

export interface PricingContext {
  reservationRooms: ReservationRoom[];
  reservationPrices: ReservationPrice[];
  reservationPricing: ReservationPricing | null;
  lookups: Lookups;
}

export interface ReviewContext {
  reservation: ReservationSnake;
  event: Event | null;
  pricingContext: PricingContext;
}
