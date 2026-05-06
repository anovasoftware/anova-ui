import {Event} from './event';

export interface Hotel {
  hotelId: string;
  code: string;
  description: string;
  currentEvent: Event;
}
