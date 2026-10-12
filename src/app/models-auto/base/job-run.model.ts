// AUTOGEN_BEGIN_JobRunSnakeAuto//
export interface JobRunSnakeAuto {
  job_run_id: string;  job_id: string;  type_id: string;  status_id: string;  hotel_id: string;  user_id: string | null;  start_date: string;  end_date: string;  record_count: number;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_JobRunSnakeAuto//

export const JOB_RUN_DEFAULT: JobRunSnakeAuto = {
  job_run_id: '',  job_id: '',  type_id: '000',  status_id: '041',  hotel_id: 'A000',  user_id: null,  start_date: '',  end_date: '',  record_count: -1,  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_JobRunAuto//
export interface JobRunAuto {
  jobRunId: string;  jobId: string;  typeId: string;  statusId: string;  hotelId: string;  userId: string | null;  startDate: string;  endDate: string;  recordCount: number;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_JobRunAuto//
