// AUTOGEN_BEGIN_TransactionSnakeAuto//
export interface TransactionSnakeAuto {
  transaction_id: string;  type_id: string;  status_id: string;  hotel_id: string;  event_id: string;  guest_id: string;  server_guest_id: string;  currency_id: string;  user_id: string;  description: string;  external_reference: string;  external_authorization_code: string;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_TransactionSnakeAuto//

export const TRANSACTION_DEFAULT: TransactionSnakeAuto = {
  transaction_id: '',  type_id: '000',  status_id: '01N',  hotel_id: 'A000',  event_id: 'A00000',  guest_id: '',  server_guest_id: '',  currency_id: '00',  user_id: 'A99999',  description: '',  external_reference: '',  external_authorization_code: '',  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_TransactionAuto//
export interface TransactionAuto {
  transactionId: string;  typeId: string;  statusId: string;  hotelId: string;  eventId: string;  guestId: string;  serverGuestId: string;  currencyId: string;  userId: string;  description: string;  externalReference: string;  externalAuthorizationCode: string;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_TransactionAuto//
