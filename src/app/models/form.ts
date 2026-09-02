import {Type} from './type';


export interface DataOption {
  id: string;
  description: string;
  displayValue: string;
}

export interface FormField<T=any> {
  formFieldId: string;
  typeId: string;
  controlType: string;
  label: string;
  name: string;
  placeholder: string;
  type: Type;
  value: any;
  readonly: boolean;
  customFlag: string;
  rows: number;
  minLength: number;
  maxLength: number;
  dataSourceAllowCreateFlag: string,
  dataSourceFormId: string,
  dataOptions: DataOption[];
  dataOptionsSelected: String[];
  collection: T[];
}

export interface FormExtra {
  formExtraId: string;
  type: Type;
  description: string;
  label: string;
  targetFormId: string;
}

export interface Form {
  formId: string;
  typeId: string;
  description: string;
  header: string;
  saveButtonLabel: string;
  saveButtonAction: string;
  readonly: boolean;
  formFields: FormField[];
  formExtras: FormExtra[];
}

