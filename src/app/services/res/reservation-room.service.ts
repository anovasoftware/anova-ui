import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ReservationRoom} from '../../models/reservation-room';
import {ReservationRoomGuest} from '../../models/reservation-room-guest.model';
import {RESERVATION_ROOM_GUEST_DEFAULT} from '../../models-auto/res/reservation-room-guest.model';
import {RESERVATION_ROOM_DEFAULT} from '../../models-auto/res/reservation-room.model';
import {TypeConstants} from '../../../constants/type_constants';

@Injectable({
  providedIn: 'root'
})
export class ReservationRoomService {

  constructor(private fb: FormBuilder) {
  }

  createReservationRoomFormGroup(roomNumber: number): FormGroup {
    const room: ReservationRoom = {
      ...RESERVATION_ROOM_DEFAULT,
      orderBy: String(roomNumber).padStart(2, '0'),
      adultCount: roomNumber === 1 ? 2 : 0
    };

    const roomForm = this.createReservationRoomFormGroupFromRoom(room);

    this.syncReservationRoomGuestCount(roomForm);

    return roomForm;
  }

  syncRooms(formGroup: FormGroup, reservationRooms: ReservationRoom[] = []): void {
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
        this.createReservationRoomFormGroupFromRoom(reservationRoom)
      );
    }

    // Make sure we have the requested number of rooms
    const roomCount = Number(
      formGroup.get('room_count')?.value || 1
    );

    this.syncRoomCount(formGroup, roomCount);
  }

  syncRoomCount(formGroup: FormGroup, roomCount: number): void {
    const rooms = formGroup.get('reservation_rooms') as FormArray;

    while (rooms.length < roomCount) {
      rooms.push(
        this.createReservationRoomFormGroup(rooms.length + 1)
      );
    }

    while (rooms.length > roomCount) {
      rooms.removeAt(rooms.length - 1);
    }
  }

  createReservationRoomGuestFormGroup(guest: ReservationRoomGuest): FormGroup {
    return this.fb.group({
      reservation_room_guest_id: [guest.reservationRoomGuestId],
      type_id: [guest.typeId],
      status_id: [guest.statusId],
      person_id: [guest.personId],
      responsible_reservation_room_guest_id: [
        guest.responsibleReservationRoomGuestId
      ],
      occupancy_type_id: [guest.occupancyTypeId],
      booking_first_name: [guest.bookingFirstName],
      booking_last_name: [guest.bookingLastName]
    });
  }

  createReservationRoomFormGroupFromRoom(
    room: ReservationRoom
  ): FormGroup {
    return this.fb.group({
      reservation_room_id: [room.reservationRoomId],
      status_id: [room.statusId],
      order_by: [room.orderBy],
      adult_count: [room.adultCount],
      child_count: [room.childCount],
      infant_count: [room.infantCount],
      category_id: [room.categoryId],
      room_id: [room.roomId],

      reservation_room_guests: this.fb.array(
        (room.reservationRoomGuests ?? []).map(guest =>
          this.createReservationRoomGuestFormGroup(guest)
        )
      )
    });
  }

  addRoom(formGroup: FormGroup): void {
    const rooms = formGroup.get('reservation_rooms') as FormArray;

    rooms.push(this.createReservationRoomFormGroup(rooms.length + 1));
    console.log(rooms);
    formGroup.get('room_count')?.setValue(rooms.length);
  }

  removeRoom(formGroup: FormGroup, index: number): void {
    const rooms = formGroup.get('reservation_rooms') as FormArray;

    rooms.removeAt(index);

    formGroup.get('room_count')?.setValue(rooms.length);
  }

  // getGuestCount(roomForm: FormGroup): number {
  //   const adultCount = Number(roomForm.get('adult_count')?.value || 0);
  //   const childCount = Number(roomForm.get('child_count')?.value || 0);
  //   const infantCount = Number(roomForm.get('infant_count')?.value || 0);
  //
  //   return adultCount + childCount + infantCount;
  // }

//   syncReservationRoomGuestCount(roomForm: FormGroup): void {
//     console.log('room controls:', Object.keys(roomForm.controls));
//     console.log(
//       'guest control:',
//       roomForm.get('reservation_room_guests')
//     );
//     const guests = roomForm.get('reservation_room_guests') as FormArray;
//     const guestCount = this.getGuestCount(roomForm);
//
//     // Add guests
//     while (guests.length < guestCount) {
//       const guest: ReservationRoomGuest = {
//         ...RESERVATION_ROOM_GUEST_DEFAULT
//       };
//       guests.push(
//         this.createReservationRoomGuestFormGroup(guest)
//       );
//     }
//
//     // Remove guests
//     while (guests.length > guestCount) {
//       guests.removeAt(guests.length - 1);
//     }
//   }
  private syncReservationRoomGuestsByOccupancyType(
    guests: FormArray,
    occupancyTypeId: string,
    count: number
  ): void {

    let matchingGuests = guests.controls.filter(
      guest =>
        guest.get('occupancy_type_id')?.value === occupancyTypeId
    );

    while (matchingGuests.length < count) {
      const guest: ReservationRoomGuest = {
        ...RESERVATION_ROOM_GUEST_DEFAULT,
        occupancyTypeId: occupancyTypeId
      };

      const guestForm =
        this.createReservationRoomGuestFormGroup(guest);

      guests.push(guestForm);
      matchingGuests.push(guestForm);
    }

    while (matchingGuests.length > count) {
      const guestForm = matchingGuests.pop();

      if (guestForm) {
        const index = guests.controls.indexOf(guestForm);

        if (index >= 0) {
          guests.removeAt(index);
        }
      }
    }
  }

  syncReservationRoomGuestCount(roomForm: FormGroup): void {
    const guests = roomForm.get('reservation_room_guests');

    if (!(guests instanceof FormArray)) {
      return;
    }

    this.syncReservationRoomGuestsByOccupancyType(
      guests,
      TypeConstants.RESERVATION_ROOM_GUEST_ADULT,
      Number(roomForm.get('adult_count')?.value || 0)
    );

    this.syncReservationRoomGuestsByOccupancyType(
      guests,
      TypeConstants.RESERVATION_ROOM_GUEST_CHILD,
      Number(roomForm.get('child_count')?.value || 0)
    );

    this.syncReservationRoomGuestsByOccupancyType(
      guests,
      TypeConstants.RESERVATION_ROOM_GUEST_INFANT,
      Number(roomForm.get('infant_count')?.value || 0)
    );
  }

}
