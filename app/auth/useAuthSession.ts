'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';

export type AppUser = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: 'admin' | 'teacher' | 'client';
  isActive?: boolean;
    tutor_id?: number | null;
      avatarUrl?: string | null;


};

const USER_KEYS = ['auth:user', 'user'];
const TOKEN_KEYS = ['token', 'auth_token', 'rb.token'];

function readFromStorage() {
  let token: string | null = null;
  let userStr: string | null = null;

  // 1) sessionStorage
  try {
    for (const k of TOKEN_KEYS) {
      token = token ?? sessionStorage.getItem(k);
    }
    for (const k of USER_KEYS) {
      userStr = userStr ?? sessionStorage.getItem(k);
    }
  } catch {}

  // 2) localStorage
  try {
    for (const k of TOKEN_KEYS) {
      token = token ?? localStorage.getItem(k);
    }
    for (const k of USER_KEYS) {
      userStr = userStr ?? localStorage.getItem(k);
    }
  } catch {}

  // Limpieza de comillas sueltas
  if (token) token = token.replace(/^["']|["']$/g, '').trim() || null;

  // Parse seguro
  let user: AppUser | null = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch {
      user = null;
    }
  }

  return { token, user };
}

export function useAuthSession() {
  const [{ user, token, ready }, setState] = useState<{
    user: AppUser | null;
    token: string | null;
    ready: boolean;
  }>({ user: null, token: null, ready: false });

  // Carga inicial
  useEffect(() => {
    const { token, user } = readFromStorage();
    setState({ token, user, ready: true });

    // Sync entre pestañas
    const onStorage = (e: StorageEvent) => {
      if (!e.key) return;
      if ([...USER_KEYS, ...TOKEN_KEYS].includes(e.key)) {
        const next = readFromStorage();
        setState((prev) => ({
          ...prev,
          token: next.token,
          user: next.user,
        }));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Guardado explícito post-login
  const setSession = useCallback(
    (next: { token: string; user: AppUser; remember?: boolean }) => {
      const { token, user, remember } = next;
      const primary = remember ? localStorage : sessionStorage;
      const secondary = remember ? sessionStorage : localStorage;

      // Normalizamos claves
      primary.setItem('token', token);
      primary.setItem('auth:user', JSON.stringify(user));
      // limpiamos alias antiguos
      try {
        primary.removeItem('user');
        secondary.removeItem('token');
        secondary.removeItem('auth:user');
        secondary.removeItem('user');
      } catch {}

      setState({ token, user, ready: true });
    },
    []
  );

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('auth:user');
      sessionStorage.removeItem('user');
    } catch {}
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('auth:user');
      localStorage.removeItem('user');
    } catch {}
    setState({ token: null, user: null, ready: true });
  }, []);

  const isAuthenticated = useMemo(() => Boolean(token && user), [token, user]);

  return { user, token, ready, isAuthenticated, setSession, logout };
}
