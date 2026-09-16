// AUTOGEN_BEGIN_GuestAuto//
export interface GuestAuto {
  guestId: string;  reservationId: string;  typeId: string;  statusId: string;  personId: string;  responsibleGuestId: string | null;  bookingFirstName: string;  bookingLastName: string;  bookingMiddleName: string;  bookingBirthDate: string;  bookingGenderTypeId: string;  grouping: string;  guestKey: string;  authorizedToChargeFlag: string;  rfidUid: string;  staticFlag: string;  internalComment: string;  createdDate: string;  lastUpdated: string;
}
//AUTOGEN_END_GuestAuto//

export const GUEST_DEFAULT: GuestAuto = {
  guestId: '',  reservationId: '',  typeId: '000',  statusId: '001',  personId: 'A00000',  responsibleGuestId: null,  bookingFirstName: '',  bookingLastName: '',  bookingMiddleName: '',  bookingBirthDate: '',  bookingGenderTypeId: '700',  grouping: '',  guestKey: '',  authorizedToChargeFlag: 'N',  rfidUid: '',  staticFlag: 'N',  internalComment: '',  createdDate: '',  lastUpdated: '',
};
