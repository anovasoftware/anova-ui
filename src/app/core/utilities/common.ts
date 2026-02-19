import {User} from '../../models/user';

export function normalizeUser(u: any): User | null {
  if (!u) return null;

  const person = u.person
    ? {
      ...u.person,
      // support both snake_case and camelCase
      personId: u.person.personId ?? u.person.person_id ?? u.person.personid,
    }
    : null;

  return {
    userId: u.userId ?? u.user_id ?? u.id,
    username: u.username ?? '',
    name: u.name ?? u.full_name ?? u.username ?? 'Guest',
    loggedIn: u.loggedIn ?? u.is_logged_in ?? !!u,
    person
  } as User;
}


