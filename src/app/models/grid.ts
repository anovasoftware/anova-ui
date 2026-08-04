import {Type} from './type';

export interface Column {
  gridColumnId: string;
  description: string;
  field: string;
  dataPath: string;
  label: string;
  format: string;
  editable: boolean;
}

export interface Row {

}
export interface LookupOptions {
  id: string;
  description: string;
}

export interface Lookup {
  label: string;
  paramName: string;
  selectedId?: string;
  enabled?: boolean;
  options: LookupOptions[];
}

export interface Lookups {
  [lookupName: string]: Lookup;
}
export interface Grid {
  gridId: string;
  description: string;
  title: string;
  formId: string;
  pageId: string;
  displayedColumns: string[];
  columns: Column[];
  rows: Row[];
  canCreate: boolean;
  displayPk: boolean;
  lookups?: Lookups;
}
