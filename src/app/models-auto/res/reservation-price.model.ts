// AUTOGEN_BEGIN_ReservationPriceAuto//
export interface ReservationPriceAuto {
  reservationPriceId: string;  reservationId: string;  typeId: string;  statusId: string;  reservationRoomGuestId: string;  reservationRoomId: string;  currencyId: string;  quantity: number;  price: number;  amount: number;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_ReservationPriceAuto//

export const RESERVATION_PRICE_DEFAULT: ReservationPriceAuto = {
  reservationPriceId: '',  reservationId: '',  typeId: '000',  statusId: '001',  reservationRoomGuestId: 'A00000',  reservationRoomId: 'A00000',  currencyId: '00',  quantity: 1,  price: 0,  amount: 0,  staticFlag: 'N',  internalComment: '',  createdDate: '',  lastUpdated: '',
};
