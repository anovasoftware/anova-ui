// AUTOGEN_BEGIN_CompanySnakeAuto//
export interface CompanySnakeAuto {
  company_id: string;  client_id: string;  type_id: string;  status_id: string;  parent_company_id: string | null;  currency_id: string;  code: string;  description: string;  description_long: string;  description_short: string;  phone: string;  email: string;  website: string;  start_date: string;  end_date: string;  effective_status_id: string;  tax_identifier: string;  external_identifier: string;  grouping: string;  company_key: string;  notes: string;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_CompanySnakeAuto//

export const COMPANY_DEFAULT: CompanySnakeAuto = {
  company_id: '',  client_id: '000',  type_id: '000',  status_id: '001',  parent_company_id: null,  currency_id: '00',  code: '',  description: '',  description_long: '',  description_short: '',  phone: '',  email: '',  website: '',  start_date: '',  end_date: '',  effective_status_id: '021',  tax_identifier: '',  external_identifier: '',  grouping: '',  company_key: '',  notes: '',  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_CompanyAuto//
export interface CompanyAuto {
  companyId: string;  clientId: string;  typeId: string;  statusId: string;  parentCompanyId: string | null;  currencyId: string;  code: string;  description: string;  descriptionLong: string;  descriptionShort: string;  phone: string;  email: string;  website: string;  startDate: string;  endDate: string;  effectiveStatusId: string;  taxIdentifier: string;  externalIdentifier: string;  grouping: string;  companyKey: string;  notes: string;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_CompanyAuto//
