// AUTOGEN_BEGIN_TransactionItemAuto//
export interface TransactionItemAuto {
  transactionItemId: string;  transactionId: string;  itemId: string;  typeId: string;  statusId: string;  description: string;  descriptionExtension: string;  quantity: number;  price: number;  serviceRate: number;  discountRate: number;  discountFlat: number;  allowance: number;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_TransactionItemAuto//

export const TRANSACTION_ITEM_DEFAULT: TransactionItemAuto = {
  transactionItemId: '',  transactionId: '',  itemId: '',  typeId: '000',  statusId: '001',  description: '',  descriptionExtension: '',  quantity: 0,  price: 0,  serviceRate: 0,  discountRate: 0,  discountFlat: 0,  allowance: 0,  staticFlag: 'N',  internalComment: '',  createdDate: '',  lastUpdated: '',
};
