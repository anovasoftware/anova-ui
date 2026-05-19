import {Event} from './event';

export interface Hotel {
  hotelId: string;
  typeId: string;
  code: string;
  description: string;
  currentEvent: Event;
}
