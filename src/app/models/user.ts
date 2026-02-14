import {Person} from './person';

export interface User {
  userId: string;
  username: string;
  person: Person | null;

  // client-only helpers (optional)
  loggedIn: boolean;
  name: string;

}
