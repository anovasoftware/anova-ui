export interface ReservationRoom {
  reservationRoomId: string | null;
  statusId: string;
  orderBy: string;

  adultCount: number;
  childCount: number;
  infantCount: number;

  categoryId: string | null;
  roomId: string | null;
}
