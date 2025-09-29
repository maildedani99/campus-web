'use client';

export async function apiFetch(path: string, init: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_ROUTE!;
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    let msg = `Error ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) {
        msg = Array.isArray(data.message) ? data.message.join(', ') : data.message;
      }
    } catch {}
    throw new Error(msg);
  }

  return res.json();
}
