import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ReservationRoom} from '../../models/reservation-room';

@Injectable({
  providedIn: 'root'
})
export class ReservationRoomService {

  constructor(private fb: FormBuilder) {
  }

  createFormGroup(roomNumber: number): FormGroup {
    return this.fb.group({
      reservation_room_id: [null],
      status_id: ['A'],
      order_by: [String(roomNumber).padStart(2, '0')],
      adult_count: [roomNumber === 1 ? 2 : 0],
      child_count: [0],
      infant_count: [0],
      category_id: [null],
      room_id: [null],
    });
  }

syncRooms(
  formGroup: FormGroup,
  reservationRooms: ReservationRoom[] = []
): void {

  let rooms = formGroup.get('reservation_rooms');

  if (!(rooms instanceof FormArray)) {
    rooms = new FormArray([]);
    formGroup.setControl('reservation_rooms', rooms);
  }

  const roomArray = rooms as FormArray;

  roomArray.clear();

  for (const reservationRoom of reservationRooms) {
    roomArray.push(
      this.createFormGroupFromRoom(reservationRoom)
    );
  }

  const roomCount = Number(
    formGroup.get('room_count')?.value || 1
  );

  while (roomArray.length < roomCount) {
    roomArray.push(
      this.createFormGroup(roomArray.length + 1)
    );
  }

  while (roomArray.length > roomCount) {
    roomArray.removeAt(roomArray.length - 1);
  }
}
  createFormGroupFromRoom(room: ReservationRoom): FormGroup {
    return this.fb.group({
      reservation_room_id: [room.reservationRoomId],
      status_id: [room.statusId],
      order_by: [room.orderBy],
      adult_count: [room.adultCount],
      child_count: [room.childCount],
      infant_count: [room.infantCount],
      category_id: [room.categoryId],
      room_id: [room.roomId]
    });
  }
}
