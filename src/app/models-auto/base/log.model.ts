// AUTOGEN_BEGIN_LogSnakeAuto//
export interface LogSnakeAuto {
  log_id: string;  type_id: string;  status_id: string;  user_id: string;  hotel_id: string;  process_id: string | null;  level: string;  message: string;  endpoint: string;  method: string;  status_code: number;  request_data: string;  response_data: string;  error: string;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_LogSnakeAuto//

export const LOG_DEFAULT: LogSnakeAuto = {
  log_id: '',  type_id: '000',  status_id: '001',  user_id: 'A99999',  hotel_id: 'A000',  process_id: null,  level: 'INFO',  message: '',  endpoint: '',  method: '',  status_code: 0,  request_data: '',  response_data: '',  error: '',  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_LogAuto//
export interface LogAuto {
  logId: string;  typeId: string;  statusId: string;  userId: string;  hotelId: string;  processId: string | null;  level: string;  message: string;  endpoint: string;  method: string;  statusCode: number;  requestData: string;  responseData: string;  error: string;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_LogAuto//
