// src/lib/auth-client.ts
const TOKEN_KEYS = ['rb.token', 'token', 'auth_token'];

export function getClientToken(): string | null {
  // Sólo en navegador
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;

  try {
    // 1) Cookies legibles (no httpOnly)
    const cookie = document.cookie ?? '';
    for (const k of TOKEN_KEYS) {
      const m = cookie.match(new RegExp(`(?:^|;\\s*)${k}=([^;]+)`));
      if (m?.[1]) return decodeURIComponent(m[1]).trim() || null;
    }

    // 2) Storages
    for (const k of ['token', 'auth_token', 'rb.token']) {
      const raw =
        window.sessionStorage?.getItem(k) ?? window.localStorage?.getItem(k);
      if (raw) return String(raw).replace(/^["']|["']$/g, '').trim() || null;
    }
  } catch {
    // no-op
  }
  return null;
}
