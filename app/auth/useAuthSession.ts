'use client';

import { useEffect, useState } from 'react';

export type AppUser = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'teacher' | 'client';
  isActive: boolean;
};

export function useAuthSession() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 1) intenta sessionStorage (login sin "Recordarme")
    let t = null as string | null;
    let u = null as string | null;

    try {
      t = sessionStorage.getItem('token');
      u = sessionStorage.getItem('user');
    } catch {}

    // 2) si no hay en sessionStorage, usa localStorage (login con "Recordarme")
    if (!t || !u) {
      try {
        t = localStorage.getItem('token') ?? t;
        u = localStorage.getItem('user') ?? u;
      } catch {}
    }

    console.log('[useAuthSession] token?', !!t, 'user string?', !!u);

    if (t && u) {
      setToken(t);
      try {
        const parsed = JSON.parse(u) as AppUser;
        setUser(parsed);
        console.log('[useAuthSession] user parsed:', parsed);
      } catch (e) {
        console.warn('[useAuthSession] JSON parse error', e);
      }
    } else {
      setToken(null);
      setUser(null);
    }

    setReady(true);
  }, []);

  const logout = () => {
    try {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    } catch {}
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch {}
    setUser(null);
    setToken(null);
    console.log('[useAuthSession] logged out');
  };

  return { user, token, ready, logout };
}
