export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  provider: 'local' | 'google';
  createdAt: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  provider: 'local' | 'google';
};

const USERS_KEY = 'applisynai_users';
const AUTH_USER_KEY = 'applisynai_auth_user';

const defaultAdminUser: StoredUser = {
  id: 'user_admin',
  name: 'Admin User',
  email: 'admin',
  password: 'abdul1996',
  provider: 'local',
  createdAt: new Date().toISOString(),
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

export function initializeDefaultUsers() {
  if (typeof window === 'undefined') return;

  const existing = window.localStorage.getItem(USERS_KEY);
  if (!existing) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([defaultAdminUser]));
    return;
  }

  const users = parseUsers(existing);
  const hasAdmin = users.some((user) => user.email.toLowerCase() === 'admin');
  if (!hasAdmin) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([defaultAdminUser, ...users]));
  }
}

export function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  initializeDefaultUsers();
  return parseUsers(window.localStorage.getItem(USERS_KEY));
}

export function getDefaultAdminUser() {
  return defaultAdminUser;
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
