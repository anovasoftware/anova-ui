// AUTOGEN_BEGIN_TransactionItemSnakeAuto//
export interface TransactionItemSnakeAuto {
  transaction_item_id: string;  transaction_id: string;  item_id: string;  type_id: string;  status_id: string;  description: string;  description_extension: string;  quantity: number;  price: number;  service_rate: number;  discount_rate: number;  discount_flat: number;  allowance: number;  static_flag: string;  internal_comment: string;  created_date: string;  last_updated: string;
}
//AUTOGEN_END_TransactionItemSnakeAuto//

export const TRANSACTION_ITEM_DEFAULT: TransactionItemSnakeAuto = {
  transaction_item_id: '',  transaction_id: '',  item_id: '',  type_id: '000',  status_id: '001',  description: '',  description_extension: '',  quantity: 0,  price: 0,  service_rate: 0,  discount_rate: 0,  discount_flat: 0,  allowance: 0,  static_flag: 'N',  internal_comment: '',  created_date: '',  last_updated: '',
};

// AUTOGEN_BEGIN_TransactionItemAuto//
export interface TransactionItemAuto {
  transactionItemId: string;  transactionId: string;  itemId: string;  typeId: string;  statusId: string;  description: string;  descriptionExtension: string;  quantity: number;  price: number;  serviceRate: number;  discountRate: number;  discountFlat: number;  allowance: number;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_TransactionItemAuto//
