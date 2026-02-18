import {Type} from './type';

export interface FormField {
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
