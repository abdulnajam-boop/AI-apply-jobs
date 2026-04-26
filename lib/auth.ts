export type StoredUser = {
  name: string;
  email: string;
  password?: string;
  provider: 'local' | 'google';
};

export type AuthUser = {
  name: string;
  email: string;
  provider: 'local' | 'google';
};

const USERS_KEY = 'applisynai_users';
const AUTH_USER_KEY = 'applisynai_auth_user';

const defaultAdminUser: StoredUser = {
  name: 'Admin User',
  email: 'admin',
  password: 'abdul1996',
  provider: 'local',
};

function parseUsers(value: string | null): StoredUser[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value) as StoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];

  const users = parseUsers(window.localStorage.getItem(USERS_KEY));
  const hasAdmin = users.some((user) => user.email.toLowerCase() === 'admin');

  if (!hasAdmin) {
    const nextUsers = [defaultAdminUser, ...users];
    window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
    return nextUsers;
  }

  return users;
}

export function saveStoredUsers(users: StoredUser[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function setAuthUser(user: AuthUser) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(AUTH_USER_KEY);
    if (!value) return null;
    return JSON.parse(value) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuthUser() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_USER_KEY);
}

export function isAdminCredential(emailOrUsername: string, password: string) {
  const normalized = emailOrUsername.trim().toLowerCase();
  return normalized === 'admin' && password === 'abdul1996';
}
