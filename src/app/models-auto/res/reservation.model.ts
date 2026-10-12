// AUTOGEN_BEGIN_ReservationSnakeAuto//
export interface ReservationSnakeAuto {
  reservation_id: string;  hotel_id: string;  type_id: string;  status_id: string;  travel_agency_company_id: string;  event_id: string;  person_id: string;  contact_person_id: string;  room_count: number;  grouping: string;  reservation_key: string;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_ReservationSnakeAuto//

export const RESERVATION_DEFAULT: ReservationSnakeAuto = {
  reservation_id: '',  hotel_id: 'A000',  type_id: '000',  status_id: '001',  travel_agency_company_id: 'A0000',  event_id: 'A99999',  person_id: 'A00000',  contact_person_id: 'A00000',  room_count: 0,  grouping: '',  reservation_key: '',  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_ReservationAuto//
export interface ReservationAuto {
  reservationId: string;  hotelId: string;  typeId: string;  statusId: string;  travelAgencyCompanyId: string;  eventId: string;  personId: string;  contactPersonId: string;  roomCount: number;  grouping: string;  reservationKey: string;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_ReservationAuto//
