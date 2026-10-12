// AUTOGEN_BEGIN_EventSnakeAuto//
export interface EventSnakeAuto {
  event_id: string;  parent_event_id: string | null;  type_id: string;  status_id: string;  client_id: string;  hotel_id: string;  code: string;  description: string;  event_start_date: string;  event_end_date: string;  start_date: string;  end_date: string;  effective_status_id: string;  grouping: string;  event_key: string;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_EventSnakeAuto//

export const EVENT_DEFAULT: EventSnakeAuto = {
  event_id: '',  parent_event_id: null,  type_id: '000',  status_id: '001',  client_id: '999',  hotel_id: 'A000',  code: '',  description: '',  event_start_date: '',  event_end_date: '',  start_date: '',  end_date: '',  effective_status_id: '021',  grouping: '',  event_key: '',  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_EventAuto//
export interface EventAuto {
  eventId: string;  parentEventId: string | null;  typeId: string;  statusId: string;  clientId: string;  hotelId: string;  code: string;  description: string;  eventStartDate: string;  eventEndDate: string;  startDate: string;  endDate: string;  effectiveStatusId: string;  grouping: string;  eventKey: string;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_EventAuto//
