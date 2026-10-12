// AUTOGEN_BEGIN_ReservationRoomGuestSnakeAuto//
export interface ReservationRoomGuestSnakeAuto {
  reservation_room_guest_id: string;  reservation_room_id: string;  type_id: string;  status_id: string;  person_id: string;  responsible_reservation_room_guest_id: string | null;  occupancy_type_id: string;  guest_number: string;  booking_first_name: string;  booking_last_name: string;  booking_middle_name: string;  booking_birth_date: string;  booking_gender_type_id: string;  grouping: string;  reservation_room_guest_key: string;  authorized_to_charge_flag: string;  rfid_uid: string;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_ReservationRoomGuestSnakeAuto//

export const RESERVATION_ROOM_GUEST_DEFAULT: ReservationRoomGuestSnakeAuto = {
  reservation_room_guest_id: '',  reservation_room_id: '',  type_id: '03T',  status_id: '001',  person_id: 'A00000',  responsible_reservation_room_guest_id: null,  occupancy_type_id: '03Q',  guest_number: '00',  booking_first_name: '',  booking_last_name: '',  booking_middle_name: '',  booking_birth_date: '',  booking_gender_type_id: '700',  grouping: '',  reservation_room_guest_key: '',  authorized_to_charge_flag: 'N',  rfid_uid: '',  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_ReservationRoomGuestAuto//
export interface ReservationRoomGuestAuto {
  reservationRoomGuestId: string;  reservationRoomId: string;  typeId: string;  statusId: string;  personId: string;  responsibleReservationRoomGuestId: string | null;  occupancyTypeId: string;  guestNumber: string;  bookingFirstName: string;  bookingLastName: string;  bookingMiddleName: string;  bookingBirthDate: string;  bookingGenderTypeId: string;  grouping: string;  reservationRoomGuestKey: string;  authorizedToChargeFlag: string;  rfidUid: string;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_ReservationRoomGuestAuto//
