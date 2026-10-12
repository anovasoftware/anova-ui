import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ReservationRoom, ReservationRoomSnake} from '../../models/reservation-room';
import {ReservationRoomGuest, ReservationRoomGuestSnake} from '../../models/reservation-room-guest.model';
import {RESERVATION_ROOM_GUEST_DEFAULT} from '../../models-auto/res/reservation-room-guest.model';
import {RESERVATION_ROOM_DEFAULT} from '../../models-auto/res/reservation-room.model';
import {TypeConstants} from '../../../constants/type_constants';
import {CaseUtility} from '../../core/utilities/case-utilities';

@Injectable({
  providedIn: 'root'
})
export class ReservationRoomService {
  constructor(private fb: FormBuilder) {
  }

  createReservationRoomFormGroup(roomNumber: number): FormGroup {
    const room: ReservationRoomSnake = {
      ...RESERVATION_ROOM_DEFAULT,
      order_by: String(roomNumber).padStart(2, '0'),
      // adultCount: roomNumber === 1 ? 2 : 0
      adult_count: 2
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
      const reservationRoomSnake = CaseUtility.toSnakeCase<ReservationRoomSnake>(reservationRoom);
      roomArray.push(this.createReservationRoomFormGroupFromRoom(reservationRoomSnake)
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

  createReservationRoomGuestFormGroup(guest: ReservationRoomGuestSnake): FormGroup {
    return this.fb.group({
      reservation_room_guest_id: [guest.reservation_room_guest_id],
      guest_number: [guest.guest_number],
      type_id: [guest.type_id],
      status_id: [guest.status_id],
      person_id: [guest.person_id],
      responsible_reservation_room_guest_id: [
        guest.responsible_reservation_room_guest_id
      ],
      occupancy_type_id: [guest.occupancy_type_id],
      booking_first_name: [guest.booking_first_name],
      booking_last_name: [guest.booking_last_name]
    });
  }

  createReservationRoomFormGroupFromRoom(room: ReservationRoomSnake): FormGroup {
    return this.fb.group({
      reservation_room_id: [room.reservation_room_id],
      status_id: [room.status_id],
      order_by: [room.order_by],
      adult_count: [room.adult_count],
      child_count: [room.child_count],
      infant_count: [room.infant_count],
      category_id: [room.category_id],
      room_id: [room.room_id],

      reservation_room_guests: this.fb.array(
        (room.reservation_room_guests ?? []).map(guest =>
          this.createReservationRoomGuestFormGroup(guest)
        )
      )
    });
  }
//   createReservationRoomFormGroupFromRoom(
//     room: ReservationRoom
//   ): FormGroup {
//     return this.fb.group({
//       reservation_room_id: [room.reservationRoomId],
//       status_id: [room.statusId],
//       order_by: [room.orderBy],
//       adult_count: [room.adultCount],
//       child_count: [room.childCount],
//       infant_count: [room.infantCount],
//       category_id: [room.categoryId],
//       room_id: [room.roomId],
//
//       reservation_room_guests: this.fb.array(
//         (room.reservationRoomGuests ?? []).map(
//           guest => this.createReservationRoomGuestFormGroupFromApi(guest)
//         )
//       )
//     });
//   }
//
//   createReservationRoomGuestFormGroupFromApi(
//     guest: ReservationRoomGuest
//   ): FormGroup {
//     return this.fb.group({
//       reservation_room_guest_id: [guest.reservationRoomGuestId],
//       guest_number: [guest.guestNumber],
//       type_id: [guest.typeId],
//       status_id: [guest.statusId],
//       person_id: [guest.personId],
//       responsible_reservation_room_guest_id: [
//         guest.responsibleReservationRoomGuestId
//       ],
//       occupancy_type_id: [guest.occupancyTypeId],
//       booking_first_name: [guest.bookingFirstName],
//       booking_last_name: [guest.bookingLastName]
//     });
//   }
//

  addRoom(formGroup: FormGroup): void {
    const rooms = formGroup.get('reservation_rooms') as FormArray;

    rooms.push(this.createReservationRoomFormGroup(rooms.length + 1));
    formGroup.get('room_count')?.setValue(rooms.length);
  }

  removeRoom(formGroup: FormGroup, index: number): void {
    const rooms = formGroup.get('reservation_rooms') as FormArray;

    rooms.removeAt(index);

    formGroup.get('room_count')?.setValue(rooms.length);
  }

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
      const guest: ReservationRoomGuestSnake = {
        ...RESERVATION_ROOM_GUEST_DEFAULT,
        occupancy_type_id: occupancyTypeId
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
    this.syncGuestNumbers(guests);
  }

  private syncGuestNumbers(guests: FormArray): void {
    guests.controls.forEach((guest, index) => {
      guest.get('guest_number')?.setValue(
        String(index + 1).padStart(2, '0')
      );
    });
  }
}
