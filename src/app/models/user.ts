import {Person} from './person';
import {Hotel} from './hotel';
import {Client} from './client';
import {Menu} from './menu';

export interface Role {
  roleId: string;
  description: string;
}

export interface User {
  userId: string;
  username: string;
  person: Person | null;
  lastHotelId: string;

  // client-only helpers (optional)
  loggedIn: boolean;
  name: string;
  roles: Role[];
  menus: Menu[];
  clients: Client[];
  hotels: Hotel[];
}
