// Firma compatible: fetcher(url, method="GET", body=null, auth=null)
// También compatible con SWR key array: fetcher([url, method, body, auth])

const API_BASE = (process.env.NEXT_PUBLIC_API_ROUTE || "").replace(/\/+$/, "");

type AuthArg =
  | null
  | string
  | { token?: string; user?: { tenant_id?: string | number } | null };

function asBearerHeader(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const t = String(raw).replace(/^["']|["']$/g, "").trim();
  if (/^bearer\s+/i.test(t)) return t; // ya viene con Bearer
  return `Bearer ${t}`;
}

function toQuery(params: Record<string, any> | null | undefined): string {
  const qs = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    qs.set(k, String(v));
  });
  const s = qs.toString();
  return s ? `?${s}` : "";
}

function buildUrl(pathOrUrl: string, method: string, body: any) {
  const isAbs = /^https?:\/\//i.test(pathOrUrl);
  const base = isAbs ? "" : API_BASE ? `${API_BASE}/` : "";
  const path = pathOrUrl.replace(/^\/+/, "");
  // GET: si body es objeto normal → querystring
  if (method.toUpperCase() === "GET" && body && !(body instanceof FormData)) {
    return `${base}${path}${toQuery(body)}`;
  }
  return `${base}${path}`;
}

// --- helper: manejar expiración de sesión de forma centralizada ---
function handleAuthExpiry(status: number, msg: string | undefined) {
  const m = (msg || "").toLowerCase();
  const looksExpired =
    status === 401 ||
    status === 419 ||
    m.includes("expired") ||
    m.includes("unauthenticated") ||
    m.includes("invalid token") ||
    m.includes("token is invalid") ||
    m.includes("signature") ||
    m.includes("jwt");

  if (looksExpired && typeof window !== "undefined") {
    try {
      // limpia storages básicos que usamos
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("auth:user");
      // borra cookie demo si la usabas
      document.cookie = "rb.token=; Path=/; Max-Age=0";
    } catch {
      /* no-op */
    }
    // redirige a sesión expirada con "next" para volver luego si procede
    const next = encodeURIComponent(
      `${window.location.pathname}${window.location.search}${window.location.hash}`
    );
    window.location.href = `/auth/session-expired?next=${next}`;
  }
}

export async function fetchApiData(
  urlOrKey: any,
  method: string = "GET",
  body: any = null,
  auth: AuthArg = null
): Promise<any> {
  // Soporta SWR: [url, method, body, auth]
  if (Array.isArray(urlOrKey)) {
    [urlOrKey, method, body, auth] = urlOrKey;
  }

  // auth puede ser string (token) o { token, user }
  const token =
    typeof auth === "string"
      ? auth
      : auth && "token" in (auth as any)
      ? (auth as any).token
      : null;

  const tenantId =
    auth && typeof auth === "object" && (auth as any).user?.tenant_id
      ? String((auth as any).user.tenant_id)
      : "";

  const url = buildUrl(String(urlOrKey), method, body);

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Cache-Control": "no-store",
  };

  let payload: BodyInit | undefined = undefined;

  if (method.toUpperCase() !== "GET") {
    if (body instanceof FormData) {
      payload = body; // no pongas Content-Type, el navegador añade el boundary
    } else if (body != null) {
      headers["Content-Type"] = "application/json";
      payload = JSON.stringify(body);
    }
  }

  const authHeader = asBearerHeader(token);
  if (authHeader) headers.Authorization = authHeader;
  if (tenantId) headers["X-Tenant-ID"] = tenantId;

  const res = await fetch(url, {
    method,
    headers,
    body: payload,
    mode: "cors",
    redirect: "follow",
    cache: "no-store",
  });

  let json: any = null;
  try {
    json = await res.json();
  } catch {
    /* sin cuerpo */
  }

  // Manejo centralizado de expiración de token
  if (!res.ok) {
    const msg = json?.message || res.statusText || `HTTP ${res.status}`;
    if (res.status === 401 || res.status === 419) {
      handleAuthExpiry(res.status, String(msg));
    }
    const err: any = new Error(msg);
    err.status = res.status;
    err.errors = json?.errors;
    // tu API puede envolver en { success:false }, preservamos body por si hace falta
    err.body = json;
    throw err;
  }

  // Tu API: { success, message, data, errors, meta }
  if (json && json.success === false) {
    const msg = json?.message || 'Request failed';
    // también chequeamos expiración aquí por si tu backend responde success:false 401-like
    handleAuthExpiry(401, String(msg));
    const err: any = new Error(msg);
    err.status = res.status;
    err.errors = json?.errors;
    throw err;
  }

  return json?.data ?? json; // devuelve data si existe; si no, el json tal cual
}

export const fetcher = fetchApiData;
export default fetchApiData;
