// AUTOGEN_BEGIN_LogAuto//
export interface LogAuto {
  logId: string;  typeId: string;  statusId: string;  userId: string;  hotelId: string;  processId: string | null;  level: string;  message: string;  endpoint: string;  method: string;  statusCode: number;  requestData: string;  responseData: string;  error: string;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_LogAuto//

export const LOG_DEFAULT: LogAuto = {
  logId: '',  typeId: '000',  statusId: '001',  userId: 'A99999',  hotelId: 'A000',  processId: null,  level: 'INFO',  message: '',  endpoint: '',  method: '',  statusCode: 0,  requestData: '',  responseData: '',  error: '',  staticFlag: 'N',  internalComment: '',  createdDate: '',  lastUpdated: '',
};
