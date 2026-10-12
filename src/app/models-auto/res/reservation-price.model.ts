// AUTOGEN_BEGIN_ReservationPriceSnakeAuto//
export interface ReservationPriceSnakeAuto {
  reservation_price_id: string;  reservation_id: string;  type_id: string;  status_id: string;  reservation_room_guest_id: string;  reservation_room_id: string;  currency_id: string;  quantity: number;  price: number;  amount: number;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_ReservationPriceSnakeAuto//

export const RESERVATION_PRICE_DEFAULT: ReservationPriceSnakeAuto = {
  reservation_price_id: '',  reservation_id: '',  type_id: '000',  status_id: '001',  reservation_room_guest_id: 'A00000',  reservation_room_id: 'A00000',  currency_id: '00',  quantity: 1,  price: 0,  amount: 0,  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_ReservationPriceAuto//
export interface ReservationPriceAuto {
  reservationPriceId: string;  reservationId: string;  typeId: string;  statusId: string;  reservationRoomGuestId: string;  reservationRoomId: string;  currencyId: string;  quantity: number;  price: number;  amount: number;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_ReservationPriceAuto//
