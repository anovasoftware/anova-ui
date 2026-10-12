// AUTOGEN_BEGIN_GridSnakeAuto//
export interface GridSnakeAuto {
  grid_id: string;  type_id: string;  status_id: string;  form_id: string;  page_id: string | null;  description: string;  title: string;  display_as: string;  can_create: boolean;  can_read: boolean;  can_update: boolean | null;  can_delete: boolean | null;  selectable: boolean | null;  display_pk: boolean | null;  create_button_label: string;  row_action: string;  data_source_application: string;  data_source_model_name: string;  order_by: string;  grouping: string;  grid_key: string;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_GridSnakeAuto//

export const GRID_DEFAULT: GridSnakeAuto = {
  grid_id: '',  type_id: '000',  status_id: '001',  form_id: '000',  page_id: null,  description: '',  title: '',  display_as: '',  can_create: false,  can_read: false,  can_update: false,  can_delete: false,  selectable: false,  display_pk: false,  create_button_label: 'Add',  row_action: 'update',  data_source_application: '',  data_source_model_name: '',  order_by: '',  grouping: '',  grid_key: '',  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_GridAuto//
export interface GridAuto {
  gridId: string;  typeId: string;  statusId: string;  formId: string;  pageId: string | null;  description: string;  title: string;  displayAs: string;  canCreate: boolean;  canRead: boolean;  canUpdate: boolean | null;  canDelete: boolean | null;  selectable: boolean | null;  displayPk: boolean | null;  createButtonLabel: string;  rowAction: string;  dataSourceApplication: string;  dataSourceModelName: string;  orderBy: string;  grouping: string;  gridKey: string;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_GridAuto//
