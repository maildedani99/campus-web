'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const raw = null;
    if (!raw) {
      router.replace('/campus');
      return;
    }
    try {
      const user = JSON.parse(raw);
      if (!user?.isActive) {
        router.replace('/campus/pending-activation');
      } else {
        router.replace('/campus/client');
      }
    } catch {
      router.replace('/auth/login');
    }
  }, [router]);

  return null;
}
