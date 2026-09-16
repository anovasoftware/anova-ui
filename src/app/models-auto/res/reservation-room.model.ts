// AUTOGEN_BEGIN_ReservationRoomAuto//
export interface ReservationRoomAuto {
  reservationRoomId: string;  reservationId: string;  typeId: string;  statusId: string;  categoryId: string;  roomId: string;  occupancy: number;  orderBy: string;  adultCount: number;  childCount: number;  infantCount: number;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_ReservationRoomAuto//

export const RESERVATION_ROOM_DEFAULT: ReservationRoomAuto = {
  reservationRoomId: '',  reservationId: '',  typeId: '000',  statusId: '001',  categoryId: 'A0001',  roomId: 'A999',  occupancy: 0,  orderBy: "99",  adultCount: 0,  childCount: 0,  infantCount: 0,  staticFlag: 'N',  internalComment: '',  createdDate: '',  lastUpdated: '',
};
