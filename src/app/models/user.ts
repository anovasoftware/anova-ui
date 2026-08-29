import {Person} from './person';
import {Hotel} from './hotel';
import {Client} from './client';
import {Menu} from './menu';
import {Company} from './company';

export interface Role {
  roleId: string;
  description: string;
}
export interface HotelList {
  hotelId: string;
  typeId: string;
  code: string;
  description: string;
}
export interface ClientList {
  clientId: string;
  code: string;
  description: string;
}

// export interface User {
//   userId: string;
//   username: string;
//   person: Person | null;
//   lastHotelId: string;
//   isSuperuser: boolean;
//
//   // client-only helpers (optional)
//   loggedIn: boolean;
//   name: string;
//   roles: Role[];
//   menus: Menu[];
//   clients: Client[];
//   hotels: Hotel[];
//
// }

export interface User {
  userId: string;
  username: string;
  displayAs: string;
  person: Person | null;

  lastHotelId: string;

  isSuperuser: boolean;
  isLoggedIn: boolean;

  currentHotel: Hotel | null;
  currentClient: Client | null;

  hotels: HotelList[];
  clients: ClientList[];
  roles: Role[];
  menus: Menu[];
  agency: Company | null;
}
