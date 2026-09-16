// AUTOGEN_BEGIN_JobRunAuto//
export interface JobRunAuto {
  jobRunId: string;  jobId: string;  typeId: string;  statusId: string;  hotelId: string;  userId: string | null;  startDate: string;  endDate: string;  recordCount: number;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_JobRunAuto//

export const JOB_RUN_DEFAULT: JobRunAuto = {
  jobRunId: '',  jobId: '',  typeId: '000',  statusId: '041',  hotelId: 'A000',  userId: null,  startDate: '',  endDate: '',  recordCount: -1,  staticFlag: 'N',  internalComment: '',  createdDate: '',  lastUpdated: '',
};
