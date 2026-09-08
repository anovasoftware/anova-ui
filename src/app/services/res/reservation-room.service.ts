import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ReservationRoom} from '../../models/reservation-room';
import {CategoryConstants} from '../../../constants/category_constants';
import {RoomConstants} from '../../../constants/room_constants';

@Injectable({
  providedIn: 'root'
})
export class ReservationRoomService {

  constructor(private fb: FormBuilder) {
  }

  createFormGroup(roomNumber: number): FormGroup {
    return this.fb.group({
      reservation_room_id: [null],
      status_id: ['001'],
      order_by: [String(roomNumber).padStart(2, '0')],
      adult_count: [roomNumber === 1 ? 2 : 0],
      child_count: [0],
      infant_count: [0],
      category_id: [CategoryConstants.BASE_CATEGORY_GRADE_NOT_SELECTED],
      room_id: [RoomConstants.TO_BE_ANNOUNCED],
    });
  }

  // syncRooms(formGroup: FormGroup, reservationRooms: ReservationRoom[] = []): void {
  //   let rooms = formGroup.get('reservation_rooms');
  //
  //   if (!(rooms instanceof FormArray)) {
  //     rooms = new FormArray([]);
  //     formGroup.setControl('reservation_rooms', rooms);
  //   }
  //
  //   const roomArray = rooms as FormArray;
  //
  //   roomArray.clear();
  //
  //   for (const reservationRoom of reservationRooms) {
  //     roomArray.push(
  //       this.createFormGroupFromRoom(reservationRoom)
  //     );
  //   }
  //
  //   const roomCount = Number(
  //     formGroup.get('room_count')?.value || 1
  //   );
  //
  //   while (roomArray.length < roomCount) {
  //     roomArray.push(
  //       this.createFormGroup(roomArray.length + 1)
  //     );
  //   }
  //
  //   while (roomArray.length > roomCount) {
  //     roomArray.removeAt(roomArray.length - 1);
  //   }
  // }

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

    // Load existing rooms from API
    for (const reservationRoom of reservationRooms) {
      roomArray.push(
        this.createFormGroupFromRoom(reservationRoom)
      );
    }

    // Make sure we have the requested number of rooms
    const roomCount = Number(
      formGroup.get('room_count')?.value || 1
    );

    this.syncRoomCount(formGroup, roomCount);
  }

  syncRoomCount(
    formGroup: FormGroup,
    roomCount: number
  ): void {
    const rooms = formGroup.get('reservation_rooms') as FormArray;

    while (rooms.length < roomCount) {
      rooms.push(
        this.createFormGroup(rooms.length + 1)
      );
    }

    while (rooms.length > roomCount) {
      rooms.removeAt(rooms.length - 1);
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

  addRoom(formGroup: FormGroup): void {
    const rooms = formGroup.get('reservation_rooms') as FormArray;

    rooms.push(this.createFormGroup(rooms.length + 1));

    formGroup.get('room_count')?.setValue(rooms.length);
  }

  removeRoom(
    formGroup: FormGroup,
    index: number
  ): void {
    const rooms = formGroup.get('reservation_rooms') as FormArray;

    rooms.removeAt(index);

    formGroup.get('room_count')?.setValue(rooms.length);
  }
}
