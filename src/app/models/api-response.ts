import { Form } from './form';

export interface ApiMeta {
  version?: string;
  databaseKey?: string;
  parameters?: any;
  [key: string]: any;
}

export interface ApiContext {
  userId?: string;
  username?: string;
  [key: string]: any;
}

export interface ApiData<TRecord = any, TSingle = TRecord, TForm = Form> {
  // list endpoints
  recordCount?: number;
  records?: TRecord[];

  // single-record endpoints
  record?: TSingle;

  // form endpoints
  form?: TForm;

  // future-proof
  [key: string]: any;
}

export interface ApiResponse<TData = any> {
  success: boolean;
  message?: string;
  code?: string;

  data: TData;          // ✅ keep required (matches your preference)

  errors: any;
  meta: ApiMeta;
  context: ApiContext;
}

/**
 * Helpful aliases so call sites stay simple/consistent:
 */

// endpoints that return data.records[]
export type RecordsResponse<T> = ApiResponse<ApiData<T>>;

// endpoints that return data.record
export type RecordResponse<T> = ApiResponse<ApiData<any, T>>;

// endpoints that return data.form (and optionally record/records too)
export type FormResponse = ApiResponse<ApiData<any, any, Form>>;
export type TypedFormResponse<TForm> = ApiResponse<ApiData<any, any, TForm>>;
