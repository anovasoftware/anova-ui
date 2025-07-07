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
}

export interface Form {
  formId: string;
  typeId: string;
  description: string;
  header: string;
  saveButtonLabel: string;
  saveButtonAction: string;
  formFields: FormField[];
}
