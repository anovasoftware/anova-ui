// AUTOGEN_BEGIN_GridAuto//
export interface GridAuto {
  gridId: string;  typeId: string;  statusId: string;  formId: string;  pageId: string | null;  description: string;  title: string;  displayAs: string;  canCreate: boolean;  canRead: boolean;  canUpdate: boolean | null;  canDelete: boolean | null;  selectable: boolean | null;  displayPk: boolean | null;  createButtonLabel: string;  rowAction: string;  dataSourceApplication: string;  dataSourceModelName: string;  orderBy: string;  grouping: string;  gridKey: string;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_GridAuto//

export const GRID_DEFAULT: GridAuto = {
  gridId: '',  typeId: '000',  statusId: '001',  formId: '000',  pageId: null,  description: '',  title: '',  displayAs: '',  canCreate: false,  canRead: false,  canUpdate: false,  canDelete: false,  selectable: false,  displayPk: false,  createButtonLabel: 'Add',  rowAction: 'update',  dataSourceApplication: '',  dataSourceModelName: '',  orderBy: '',  grouping: '',  gridKey: '',  staticFlag: 'N',  internalComment: '',  createdDate: '',  lastUpdated: '',
};
