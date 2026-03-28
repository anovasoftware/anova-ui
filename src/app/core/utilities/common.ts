import {Role, User} from '../../models/user';
import {Client} from '../../models/client';
import {Hotel} from '../../models/hotel';
import {Menu} from '../../models/menu';

export function normalizeUser(u: any): User | null {
  if (!u) return null;

  const person = u.person
    ? {
      ...u.person,
      personId: u.person.personId,
    }
    : null;

  // Normalize roles safely
  const roles: Role[] = Array.isArray(u.roles)
    ? u.roles.map((r: any) => ({
        roleId: r.roleId,
        description: r.description,
      }))
    : [];

    // Normalize menus safely
  const menus: Menu[] = Array.isArray(u.menus)
    ? u.menus.map((m: any) => ({
        menuId: m.menuId,
        description: m.description,
        hotelRequired: m.hotelRequired,
      }))
    : [];

    // Normalize clients safely
  const clients: Client[] = Array.isArray(u.clients)
    ? u.clients.map((c: any) => ({
        clientId: c.clientId,
        code: c.code,
        description: c.description,
      }))
    : [];

    // Normalize hotels safely
  const hotels: Hotel[] = Array.isArray(u.hotels)
    ? u.hotels.map((h: any) => ({
      hotelId: h.hotelId,
      code: h.code,
      description: h.description,
    }))
    : [];

  return {
    userId: u.userId,
    username: u.username,
    name: u.name  ?? 'Guest',
    loggedIn: u.loggedIn ?? false,
    lastHotelId: u.lastHotelId ?? null,
    isSuperuser: u.isSuperuser ?? false,

    person,
    roles,
    menus,
    clients,
    hotels
  } as User;
}


