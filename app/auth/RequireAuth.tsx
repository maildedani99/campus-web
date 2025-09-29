'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthSession } from './useAuthSession';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuthSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!ready) return;
    console.log('[RequireAuth] ready:', ready, 'user:', user);
    if (!user) {
      console.log('[RequireAuth] no user -> /auth/login');
      router.replace('/auth/login');
    }
  }, [ready, user, router]);

  if (!ready) return null;
  if (!user) return null;

  return <>{children}</>;
}
