'use client';

import { CalendarCheck, Clock, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { APP_URL, SPECIALTIES, WORKSHOP } from '@/lib/content';

/** Isotipo genérico (tuerca) en el color de marca. Reemplázalo por el logo del taller si tiene uno. */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="lm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'rgb(var(--brand-500))' }} />
          <stop offset="1" style={{ stopColor: 'rgb(var(--brand-800))' }} />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#lm)" />
      <path d="M20 8.5 30 14.25v11.5L20 31.5 10 25.75v-11.5Z" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinejoin="round" />
      <circle cx="20" cy="20" r="4.6" fill="none" stroke="#ffd43b" strokeWidth="2.6" />
    </svg>
  );
}

function Logo({ dark }: { dark?: boolean }) {
  const words = WORKSHOP.name.trim().split(/\s+/);
  const last = words.length > 1 ? words.pop() : null;
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <LogoMark />
      <span className={`font-display text-lg font-black uppercase leading-none ${dark ? 'text-white' : 'text-ink-950'}`}>
        {words.join(' ')} {last && <span className="text-brand-600">{last}</span>}
      </span>
    </Link>
  );
}

const NAV = [
  { href: '/#especialidades', label: 'Especialidades' },
  { href: '/#equipo', label: 'Equipo' },
  { href: '/#historia', label: 'Historia' },
  { href: `${APP_URL}/tienda`, label: 'Tienda' },
  { href: `${APP_URL}/seguimiento`, label: 'Seguir mi auto' },
  { href: '/#contacto', label: 'Contacto' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b transition ${scrolled ? 'border-ink-200/80 bg-white/85 backdrop-blur-xl' : 'border-transparent bg-white'}`}>
      <div className="container flex h-16 items-center gap-6">
        <Logo />
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 hover:text-ink-950">{n.label}</a>
          ))}
        </nav>
        <Link href="/agenda" className="ml-auto hidden h-10 items-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white shadow-glow hover:bg-brand-700 sm:inline-flex lg:ml-0">
          <CalendarCheck className="h-4 w-4" /> Agendar hora
        </Link>
        <button className="ml-auto grid h-10 w-10 place-items-center rounded-xl hover:bg-ink-100 sm:ml-0 lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menú">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="container flex flex-col gap-1 border-t border-ink-100 py-4 lg:hidden">
          {[...NAV, { href: '/agenda', label: 'Agendar hora' }].map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-medium text-ink-800 hover:bg-ink-50">{n.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer id="contacto" className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div className="absolute inset-0 bg-grid-fade bg-[size:40px_40px] opacity-40" />
      <div className="container relative grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Logo dark />
          <p className="mt-4 text-sm text-ink-400">{WORKSHOP.tagline}.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Especialidades</h4>
          <ul className="space-y-2 text-sm">
            {SPECIALTIES.map((s) => <li key={s.slug}><Link href={`/especialidades/${s.slug}`} className="hover:text-white">{s.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Clientes</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/agenda" className="hover:text-white">Agendar hora</Link></li>
            <li><a href={`${APP_URL}/seguimiento`} className="hover:text-white">Seguimiento de mi auto</a></li>
            <li><a href={`${APP_URL}/tienda`} className="hover:text-white">Tienda de repuestos</a></li>
            <li><a href={`${APP_URL}/ingresar`} className="hover:text-white">Mi cuenta</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Contacto</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />{WORKSHOP.address}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /><a href={`tel:${WORKSHOP.phone.replace(/\s/g, '')}`}>{WORKSHOP.phone}</a></li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /><a href={`mailto:${WORKSHOP.email}`}>{WORKSHOP.email}</a></li>
            <li className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />{WORKSHOP.hours.join(' · ')}</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container flex flex-col gap-2 py-5 text-xs text-ink-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {WORKSHOP.legalName}</p>
          <p>Agenda y tienda con TuercApp</p>
        </div>
      </div>
    </footer>
  );
}
