const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api').replace(/\/$/, '');
const WORKSHOP = process.env.NEXT_PUBLIC_WORKSHOP ?? 'rayo-mcqueen';

/** Cliente mínimo de la API de TuercApp (solo se usa desde el navegador). */
export async function api<T>(path: string, init?: { method?: string; body?: unknown; query?: Record<string, string> }): Promise<T> {
  const qs = init?.query ? `?${new URLSearchParams(init.query)}` : '';
  const res = await fetch(`${BASE}${path}${qs}`, {
    method: init?.method ?? 'GET',
    headers: { 'content-type': 'application/json', 'x-workshop': WORKSHOP },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((Array.isArray(data.message) ? data.message[0] : data.message) || 'No pudimos conectar con el taller');
  }
  return res.json();
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  durationMin: number;
  basePrice: number;
}

export interface Slot {
  startsAt: string;
  available: boolean;
  remaining: number;
}

export const clp = (n: number) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);
const TZ = 'America/Santiago';
export const fmt = (d: Date | string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('es-CL', { timeZone: TZ, ...o }).format(new Date(d));
export const localDay = (d: Date) => new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
