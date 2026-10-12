// AUTOGEN_BEGIN_GuestSnakeAuto//
export interface GuestSnakeAuto {
  guest_id: string;  reservation_id: string;  type_id: string;  status_id: string;  person_id: string;  responsible_guest_id: string | null;  booking_first_name: string;  booking_last_name: string;  booking_middle_name: string;  booking_birth_date: string;  booking_gender_type_id: string;  grouping: string;  guest_key: string;  authorized_to_charge_flag: string;  rfid_uid: string;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_GuestSnakeAuto//

export const GUEST_DEFAULT: GuestSnakeAuto = {
  guest_id: '',  reservation_id: '',  type_id: '000',  status_id: '001',  person_id: 'A00000',  responsible_guest_id: null,  booking_first_name: '',  booking_last_name: '',  booking_middle_name: '',  booking_birth_date: '',  booking_gender_type_id: '700',  grouping: '',  guest_key: '',  authorized_to_charge_flag: 'N',  rfid_uid: '',  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_GuestAuto//
export interface GuestAuto {
  guestId: string;  reservationId: string;  typeId: string;  statusId: string;  personId: string;  responsibleGuestId: string | null;  bookingFirstName: string;  bookingLastName: string;  bookingMiddleName: string;  bookingBirthDate: string;  bookingGenderTypeId: string;  grouping: string;  guestKey: string;  authorizedToChargeFlag: string;  rfidUid: string;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_GuestAuto//
