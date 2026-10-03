'use client';

import { CalendarCheck, CheckCircle2, Loader2, MessageCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { api, clp, fmt, localDay, type Service, type Slot } from '@/lib/api';
import { APP_URL, WORKSHOP } from '@/lib/content';

const DAY = 86400000;

interface Booking {
  code: string;
  startsAt: string;
  service: { name: string };
}

/** Reemplaza el antiguo formulario agenda.html + action_page.php por una reserva real en TuercApp. */
export function BookingForm() {
  const preselect = useSearchParams().get('servicio');
  const [services, setServices] = useState<Service[] | null>(null);
  const [serviceId, setServiceId] = useState('');
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => new Date(Date.now() + (i + 1) * DAY)), []);
  const [day, setDay] = useState(() => localDay(days.find((d) => !fmt(d, { weekday: 'short' }).startsWith('dom')) ?? days[0]));
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [startsAt, setStartsAt] = useState('');
  const [form, setForm] = useState({ contactName: '', contactEmail: '', contactPhone: '', plate: '', make: '', model: '', notes: '' });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState<Booking | null>(null);

  useEffect(() => {
    api<Service[]>('/services')
      .then((list) => {
        setServices(list);
        setServiceId(list.find((s) => s.slug === preselect)?.id ?? list[0]?.id ?? '');
      })
      .catch((e) => setError(e.message));
  }, [preselect]);

  useEffect(() => {
    if (!serviceId) return;
    setSlots(null);
    setStartsAt('');
    api<Slot[]>('/bookings/availability', { query: { serviceId, date: day } }).then(setSlots).catch((e) => setError(e.message));
  }, [serviceId, day]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!startsAt) return setError('Elige una hora');
    setSending(true);
    setError('');
    try {
      setDone(await api<Booking>('/bookings', {
        method: 'POST',
        body: { serviceId, startsAt, ...form, make: form.make || undefined, model: form.model || undefined, notes: form.notes || undefined },
      }));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  }

  const wa = `https://wa.me/${WORKSHOP.whatsapp.replace(/\D/g, '')}`;

  if (done) {
    return (
      <div className="card mt-8 p-8 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
        <h2 className="mt-4 text-2xl font-bold">Hola {form.contactName.split(' ')[0]}, tu hora ha sido agendada</h2>
        <p className="mt-2 text-ink-600">{done.service.name} · <span className="inline-block first-letter:uppercase">{fmt(done.startsAt, { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</span></p>
        <p className="mt-6 text-xs uppercase tracking-wider text-ink-500">Código de reserva</p>
        <p className="font-mono text-3xl font-black">{done.code}</p>
        <a href={`${APP_URL}/registro`} className="mt-8 inline-flex rounded-xl bg-ink-950 px-6 py-3 font-semibold text-white">Crear cuenta para seguir mi auto</a>
      </div>
    );
  }

  if (error && !services) {
    return (
      <div className="card mt-8 p-8 text-center">
        <p className="font-semibold">La agenda online no está disponible en este momento.</p>
        <p className="mt-1 text-sm text-ink-500">{error}</p>
        <a href={wa} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white"><MessageCircle className="h-5 w-5" /> Agenda por WhatsApp</a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card mt-8 space-y-8 p-6 md:p-8">
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-ink-500">1 · Arreglo / mantención</h2>
        {!services ? <div className="skeleton h-24" /> : (
          <div className="grid gap-2 sm:grid-cols-2">
            {services.map((s) => (
              <label key={s.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition ${serviceId === s.id ? 'border-brand-600 ring-4 ring-brand-500/10' : 'border-ink-200 hover:border-ink-400'}`}>
                <input type="radio" name="service" className="accent-brand-600" checked={serviceId === s.id} onChange={() => setServiceId(s.id)} />
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{s.name}</span>
                  <span className="text-xs text-ink-500">desde {clp(s.basePrice)}</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-ink-500">2 · Día y hora</h2>
        <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
          {days.map((d) => {
            const key = localDay(d);
            const sunday = fmt(d, { weekday: 'short' }).startsWith('dom');
            return (
              <button type="button" key={key} disabled={sunday} onClick={() => setDay(key)}
                className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border py-2.5 transition disabled:opacity-35 ${day === key ? 'border-ink-950 bg-ink-950 text-white' : 'border-ink-200 bg-white hover:border-ink-400'}`}>
                <span className="text-[11px] font-semibold uppercase">{fmt(d, { weekday: 'short' }).replace('.', '')}</span>
                <span className="font-display text-xl font-bold">{fmt(d, { day: 'numeric' })}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 min-h-16">
          {!slots ? <p className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> Buscando horas…</p> : slots.length === 0 ? (
            <p className="text-sm text-ink-500">No atendemos este día.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {slots.map((s) => (
                <button type="button" key={s.startsAt} disabled={!s.available} onClick={() => setStartsAt(s.startsAt)}
                  className={`rounded-xl border py-2.5 text-sm font-semibold transition disabled:border-dashed disabled:text-ink-300 ${startsAt === s.startsAt ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-200 bg-white hover:border-brand-400'}`}>
                  {fmt(s.startsAt, { hour: '2-digit', minute: '2-digit' })}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-ink-500">3 · Tus datos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label><span className="label">Nombre</span><input className="input" required minLength={2} value={form.contactName} onChange={set('contactName')} /></label>
          <label><span className="label">Correo electrónico</span><input className="input" type="email" required value={form.contactEmail} onChange={set('contactEmail')} /></label>
          <label><span className="label">Teléfono</span><input className="input" type="tel" required minLength={8} value={form.contactPhone} onChange={set('contactPhone')} placeholder="+56 9 1234 5678" /></label>
          <label><span className="label">Patente</span><input className="input font-mono uppercase tracking-widest" required minLength={5} maxLength={8} value={form.plate} onChange={set('plate')} placeholder="KJTR45" /></label>
          <label><span className="label">Marca</span><input className="input" value={form.make} onChange={set('make')} /></label>
          <label><span className="label">Modelo</span><input className="input" value={form.model} onChange={set('model')} /></label>
          <label className="sm:col-span-2"><span className="label">¿Qué le pasa a tu auto?</span><textarea className="input min-h-20" value={form.notes} onChange={set('notes')} /></label>
        </div>
      </section>

      {error && <p className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">{error}</p>}
      <button type="submit" disabled={sending || !startsAt} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3.5 font-semibold text-white shadow-glow transition hover:bg-brand-700 disabled:opacity-50">
        {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <CalendarCheck className="h-5 w-5" />} Confirmar reserva
      </button>
    </form>
  );
}
