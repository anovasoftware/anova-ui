// AUTOGEN_BEGIN_ReservationRoomSnakeAuto//
export interface ReservationRoomSnakeAuto {
  reservation_room_id: string;  reservation_id: string;  type_id: string;  status_id: string;  category_id: string;  room_id: string;  occupancy: number;  order_by: string;  adult_count: number;  child_count: number;  infant_count: number;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_ReservationRoomSnakeAuto//

export const RESERVATION_ROOM_DEFAULT: ReservationRoomSnakeAuto = {
  reservation_room_id: '',  reservation_id: '',  type_id: '000',  status_id: '001',  category_id: 'A0001',  room_id: 'A999',  occupancy: 0,  order_by: "99",  adult_count: 0,  child_count: 0,  infant_count: 0,  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_ReservationRoomAuto//
export interface ReservationRoomAuto {
  reservationRoomId: string;  reservationId: string;  typeId: string;  statusId: string;  categoryId: string;  roomId: string;  occupancy: number;  orderBy: string;  adultCount: number;  childCount: number;  infantCount: number;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_ReservationRoomAuto//
