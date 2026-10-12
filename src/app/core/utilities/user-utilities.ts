import {Role, User} from '../../models/user';
import {Client} from '../../models/client';
import {Hotel} from '../../models/hotel';
import {Menu} from '../../models/menu';
import {Company} from '../../models/company';

export function normalizeUser(u: any): User | null {
  if (!u) {
    return null;
  }

  const person = u.person
    ? {
      ...u.person,
      personId: u.person.personId,
      displayName: u.person.displayName ?? '',
    }
    : null;

  const displayAs =
    u.displayAs ||
    person?.displayName ||
    [person?.firstName, person?.lastName]
      .filter(Boolean)
      .join(' ') ||
    u.username ||
    '';

  const roles: Role[] = Array.isArray(u.roles)
    ? u.roles.map((r: any) => ({
      roleId: r.roleId,
      description: r.description,
      hotelId: r.hotelId,
    }))
    : [];

  const menus: Menu[] = Array.isArray(u.menus)
    ? u.menus.map((m: any) => ({
      menuId: m.menuId,
      description: m.description,
      hotelRequired: m.hotelRequired ?? false,
      hotelTypeIds: m.hotelTypeIds ?? [],
      orderBy: m.orderBy,
    }))
    : [];

  const clients: Client[] = Array.isArray(u.clients)
    ? u.clients.map((c: any) => ({
      clientId: c.clientId,
      code: c.code,
      description: c.description,
    }))
    : [];

  const hotels: Hotel[] = Array.isArray(u.hotels)
    ? u.hotels.map((h: any) => ({
      hotelId: h.hotelId,
      typeId: h.typeId,
      code: h.code,
      description: h.description,
    }))
    : [];

  const currentHotel: Hotel | null = u.currentHotel
    ? {
      hotelId: u.currentHotel.hotelId,
      typeId: u.currentHotel.typeId,
      clientId: u.currentHotel.clientId,
      code: u.currentHotel.code,
      description: u.currentHotel.description,

      hotelExtension: u.currentHotel.hotelExtension
        ? {
          hotelExtensionId:
          u.currentHotel.hotelExtension.hotelExtensionId,

          currencyId:
          u.currentHotel.hotelExtension.currencyId,

          currentEvent:
            u.currentHotel.hotelExtension.currentEvent
              ? {
                ...u.currentHotel.hotelExtension.currentEvent,
              }
              : null,
        }
        : null,
    }
    : null;

  const currentClient: Client | null = u.currentClient
    ? {
      clientId: u.currentClient.clientId,
      code: u.currentClient.code,
      description: u.currentClient.description,

      clientExtension: u.currentClient.clientExtension
        ? {
          clientExtensionId:
          u.currentClient.clientExtension.clientExtensionId,

          currencyId:
          u.currentClient.clientExtension.currencyId,
        }
        : null,
    }
    : null;
  const agency: Company | null = u.agency
    ? {
      companyId: u.agency.companyId,
      code: u.agency.code,
      description: u.agency.description,
    }
    : null;
  return {
    userId: u.userId,
    username: u.username,
    displayAs: u.displayAs,

    // API returns isLoggedIn
    isLoggedIn: u.isLoggedIn ?? false,

    lastHotelId:
      u.lastHotelId ??
      currentHotel?.hotelId ??
      null,

    isSuperuser: u.isSuperuser ?? false,

    person,
    currentHotel,
    currentClient,

    roles,
    menus,
    clients,
    hotels,
    agency
  };
}

