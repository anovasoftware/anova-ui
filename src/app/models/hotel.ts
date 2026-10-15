import {Event} from './event.model';

export interface HotelExtension {
  hotelExtensionId: string;
  currentEvent: Event | null;
  currencyId: string;
}


export interface Hotel {
  hotelId: string;
  clientId: string;
  typeId: string;
  code: string;
  description: string;
  hotelExtension?: HotelExtension | null;
}
