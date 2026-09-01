export interface Guest {
  guestId: string;
  statusId: string;
  guestTypeId: string;
  bookingFirstName: string;
  bookingMiddleName?: string;
  bookingLastName: string;
  bookingSuffix?: string;
  birthDate?: string;
  genderTypeId?: string;
}
