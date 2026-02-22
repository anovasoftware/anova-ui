import {User} from '../../models/user';
import {Client} from '../../models/client';
import {Hotel} from '../../models/hotel';

export function normalizeUser(u: any): User | null {
  if (!u) return null;

  const person = u.person
    ? {
      ...u.person,
      // support both snake_case and camelCase
      personId: u.person.personId ?? u.person.person_id ?? u.person.personid,
    }
    : null;

    // Normalize clients safely
  const clients: Client[] = Array.isArray(u.clients)
    ? u.clients.map((c: any) => ({
        clientId: c.clientId ?? c.client_id ?? c.id ?? '',
        code: c.code ?? '',
        description: c.description ?? '',
      }))
    : [];

    // Normalize clients safely
  const hotels: Hotel[] = Array.isArray(u.hotels)
    ? u.hotels.map((c: any) => ({
      hotelId: c.hotelId ?? c.hotel_id ?? c.id ?? '',
      code: c.code ?? '',
      description: c.description ?? '',
    }))
    : [];

  return {
    userId: u.userId ?? u.user_id ?? u.id,
    username: u.username ?? '',
    name: u.name ?? u.full_name ?? u.username ?? 'Guest',
    loggedIn: u.loggedIn ?? u.is_logged_in ?? !!u,
    person,
    clients,
    hotels
  } as User;
}


