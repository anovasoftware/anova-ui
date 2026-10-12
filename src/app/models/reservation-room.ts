import {
  ReservationRoomAuto,
  ReservationRoomSnakeAuto
} from '../models-auto/res/reservation-room.model';

import {
  ReservationRoomGuest,
  ReservationRoomGuestSnake
} from './reservation-room-guest.model';

export interface ReservationRoom extends ReservationRoomAuto {
  reservationRoomGuests?: ReservationRoomGuest[];
}

export interface ReservationRoomSnake extends ReservationRoomSnakeAuto {
  reservation_room_guests?: ReservationRoomGuestSnake[];
}
