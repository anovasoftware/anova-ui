import {ReservationRoomAuto} from '../models-auto/res/reservation-room.model';
import {ReservationRoomGuest} from './reservation-room-guest.model';

export interface ReservationRoom extends ReservationRoomAuto {
  reservationRoomGuests?: ReservationRoomGuest[];
}
