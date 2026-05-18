import {Type} from './type';

export interface Column {
  gridColumnId: string;
  description: string;
  field: string;
  dataPath: string;
  label: string;
  format: string;
}

export interface Row {

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
}
