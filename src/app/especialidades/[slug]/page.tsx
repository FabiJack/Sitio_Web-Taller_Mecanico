import { CalendarCheck, Check, Wrench } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SpecialtyIcon } from '@/components/specialty-icon';
import { SPECIALTIES } from '@/lib/content';

export const dynamicParams = false;
export const generateStaticParams = () => SPECIALTIES.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SPECIALTIES.find((x) => x.slug === slug);
  return s ? { title: s.name, description: s.description } : {};
}

const fmtDate = (iso: string) => new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));

export default async function SpecialtyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SPECIALTIES.find((x) => x.slug === slug);
  if (!s) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <Image src={s.images[0]} alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
        <div className="container relative py-20">
          <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 shadow-glow"><SpecialtyIcon name={s.icon} className="h-7 w-7" /></span>
          <h1 className="text-balance text-4xl font-black md:text-6xl">{s.name}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-300">{s.description}</p>
          <Link href={`/agenda?servicio=${s.serviceSlug}`} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 font-semibold shadow-glow hover:bg-brand-700">
            <CalendarCheck className="h-5 w-5" /> Agendar {s.name.toLowerCase()}
          </Link>
        </div>
      </section>

      <section className="container grid gap-10 py-16 lg:grid-cols-[1fr_340px]">
        <div>
          <p className="eyebrow">Últimos trabajos realizados</p>
          <h2 className="mt-2 text-3xl font-bold">El detalle de lo que hacemos</h2>
          <div className="mt-8 space-y-5">
            {s.jobs.map((j, i) => (
              <article key={j.title} className="card grid overflow-hidden sm:grid-cols-[220px_1fr]">
                <div className="relative h-48 sm:h-full">
                  <Image src={s.images[i % s.images.length]} alt={j.title} fill sizes="220px" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold">{j.title}</h3>
                  <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div><dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">Diagnóstico</dt><dd className="mt-1 font-medium">{j.diagnosis}</dd></div>
                    <div><dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">Fecha</dt><dd className="mt-1 font-medium">{fmtDate(j.date)}</dd></div>
                    <div><dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">Mecánico</dt><dd className="mt-1 font-medium">{s.mechanic.name}</dd></div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">Herramientas</dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">{j.tools.map((t) => <span key={t} className="rounded-md bg-ink-100 px-2 py-0.5 text-xs font-medium">{t}</span>)}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="space-y-5">
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold"><Wrench className="h-5 w-5 text-brand-600" /> Qué incluye</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {s.services.map((x) => <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> {x}</li>)}
            </ul>
          </div>
          <div className="card flex items-center gap-4 p-6">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 font-display text-lg font-bold text-white">{s.mechanic.initials}</span>
            <div><p className="font-semibold">{s.mechanic.name}</p><p className="text-sm text-ink-500">Especialista a cargo</p></div>
          </div>
          <div className="rounded-2xl bg-ink-950 p-6 text-white">
            <p className="font-display text-lg font-bold">Agenda tu hora</p>
            <p className="mt-1 text-sm text-ink-400">Con nuestros mecánicos especialistas, y prontamente tendrás tu auto contigo.</p>
            <Link href={`/agenda?servicio=${s.serviceSlug}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 font-semibold hover:bg-brand-700">Agendar</Link>
          </div>
        </aside>
      </section>
    </>
  );
}
