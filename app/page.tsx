'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    try {
      const raw =
        typeof window !== 'undefined'
          ? localStorage.getItem('auth:user') ?? localStorage.getItem('user')
          : null;

      if (!raw) {
        router.replace('/auth/login');
        return;
      }

      router.replace('/campus/inactive'); // ← demo
    } catch {
      router.replace('/auth/login');
    }
  }, [router]);

  return null;
}
