import {Person} from './person';
import {Hotel} from './hotel';
import {Client} from './client';

export interface User {
  userId: string;
  username: string;
  person: Person | null;
  lastHotelId: string;

  // client-only helpers (optional)
  loggedIn: boolean;
  name: string;
  clients: Client[];
  hotels: Hotel[];
}
