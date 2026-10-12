// AUTOGEN_BEGIN_LocationSnakeAuto//
export interface LocationSnakeAuto {
  location_id: string;  type_id: string;  status_id: string;  parent_location_id: string | null;  code: string;  external_code: string;  description: string;  latitude: number;  longitude: number;  grouping: string;  location_key: string;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_LocationSnakeAuto//

export const LOCATION_DEFAULT: LocationSnakeAuto = {
  location_id: '',  type_id: '000',  status_id: '001',  parent_location_id: null,  code: '',  external_code: '',  description: '',  latitude: 0,  longitude: 0,  grouping: '',  location_key: '',  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_LocationAuto//
export interface LocationAuto {
  locationId: string;  typeId: string;  statusId: string;  parentLocationId: string | null;  code: string;  externalCode: string;  description: string;  latitude: number;  longitude: number;  grouping: string;  locationKey: string;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_LocationAuto//
