import { ArrowRight, BadgeCheck, CalendarCheck, Camera, GraduationCap, MessageCircle, Radar, ShieldCheck, ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SpecialtyIcon } from '@/components/specialty-icon';
import { APP_URL, HISTORY, SPECIALTIES, WORKSHOP } from '@/lib/content';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <Image src="/img/mecanico1.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/40" />
        <div className="absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-brand-700/40 blur-[120px]" />
        <div className="container relative py-24 lg:py-32">
          <div className="max-w-2xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-ink-300 backdrop-blur">
              <span className="flex text-volt-400">{[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}</span>
              Bienvenido a nuestro taller · {WORKSHOP.city}
            </div>
            <h1 className="text-balance font-display text-5xl font-black uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
              {WORKSHOP.headline[0]}
              <span className="block bg-gradient-to-r from-brand-500 to-volt-400 bg-clip-text text-transparent">{WORKSHOP.headline[1]}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-300">
              Especialistas en <b className="text-white">electrónica automotriz</b>, <b className="text-white">cajas de cambio</b> y{' '}
              <b className="text-white">suspensión y dirección</b>. Agenda online, diagnóstico con fotos y seguimiento de tu auto desde el celular.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/agenda" className="inline-flex h-13 items-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 font-semibold text-white shadow-glow hover:bg-brand-700">
                <CalendarCheck className="h-5 w-5" /> Agendar hora
              </Link>
              <a href={`${APP_URL}/tienda`} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-7 py-3.5 font-semibold backdrop-blur hover:bg-white/20">
                <ShoppingBag className="h-5 w-5" /> Tienda de repuestos
              </a>
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-white/[0.02]">
          <div className="container grid grid-cols-2 gap-6 py-6 text-sm md:grid-cols-4">
            {[
              [GraduationCap, WORKSHOP.credential.title, WORKSHOP.credential.detail],
              [Camera, 'Diagnóstico con fotos', 'antes de cotizar'],
              [MessageCircle, 'Avisos por WhatsApp', 'en cada etapa'],
              [ShieldCheck, 'Bencina y diésel', 'servicio completo'],
            ].map(([Icon, t, s]) => {
              const I = Icon as typeof Camera;
              return (
                <div key={t as string} className="flex items-center gap-3">
                  <I className="h-5 w-5 shrink-0 text-volt-400" />
                  <div><p className="font-semibold">{t as string}</p><p className="text-xs text-ink-400">{s as string}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section id="especialidades" className="container scroll-mt-20 py-20">
        <p className="eyebrow">Especialidades</p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold md:text-4xl">Tres especialistas, un servicio completo</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SPECIALTIES.map((s) => (
            <Link key={s.slug} href={`/especialidades/${s.slug}`} className="group card overflow-hidden transition hover:-translate-y-1 hover:shadow-lift">
              <div className="relative h-52 overflow-hidden bg-ink-900">
                <Image src={s.images[0]} alt={s.name} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover opacity-85 transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 to-transparent" />
                <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-600 shadow"><SpecialtyIcon name={s.icon} className="h-5 w-5" /></span>
                <h3 className="absolute bottom-4 left-4 font-display text-2xl font-black text-white">{s.name}</h3>
              </div>
              <div className="p-6">
                <p className="text-ink-600">{s.short}</p>
                <p className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-ink-500">Con {s.mechanic.name.split(' ').slice(0, 2).join(' ')}</span>
                  <span className="flex items-center gap-1 font-semibold text-brand-600">Ver trabajos <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Experiencia digital */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgb(var(--brand-600)/0.25),transparent_60%)]" />
        <div className="container relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-volt-400">Sin sorpresas</p>
            <h2 className="mt-3 text-balance text-3xl font-bold md:text-4xl">Tu auto en el taller, en la palma de tu mano</h2>
            <p className="mt-4 text-ink-300">Trabajamos con TuercApp: ves la inspección de tu vehículo con fotos, apruebas solo lo que quieres reparar y sigues cada etapa en vivo.</p>
            <ul className="mt-8 space-y-4">
              {[
                [CalendarCheck, 'Agenda en 1 minuto con horas reales disponibles'],
                [Camera, 'Inspección multipunto con fotos y notas del mecánico'],
                [BadgeCheck, 'Aprueba el presupuesto ítem por ítem desde el celular'],
                [Radar, 'Seguimiento en vivo hasta que tu auto está listo'],
              ].map(([Icon, t]) => {
                const I = Icon as typeof Camera;
                return <li key={t as string} className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 shadow-glow"><I className="h-5 w-5" /></span>{t as string}</li>;
              })}
            </ul>
            <a href={`${APP_URL}/seguimiento/demo-seguimiento-kjtr45`} className="mt-8 inline-flex items-center gap-2 font-semibold text-volt-400 hover:text-volt-300">
              Ver una orden de ejemplo <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl"><Image src="/img/electronica1.jpg" alt="Diagnóstico electrónico" fill sizes="25vw" className="object-cover" /></div>
            <div className="relative mt-12 aspect-[4/5] overflow-hidden rounded-3xl"><Image src="/img/caja2.jpg" alt="Caja de cambios" fill sizes="25vw" className="object-cover" /></div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section id="equipo" className="container scroll-mt-20 py-20">
        <p className="eyebrow">Nuestro equipo</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Estos son nuestros mecánicos especialistas</h2>
        <p className="mt-3 max-w-2xl text-ink-600">Conoce un poco más de ellos y revisa sus últimos trabajos realizados.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {SPECIALTIES.map((s) => (
            <div key={s.slug} className="card flex items-center gap-4 p-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 font-display text-lg font-bold text-white">{s.mechanic.initials}</span>
              <div className="min-w-0">
                <p className="font-semibold text-ink-950">{s.mechanic.name}</p>
                <p className="text-sm text-ink-500">Especialista en {s.name.toLowerCase()}</p>
                <Link href={`/especialidades/${s.slug}`} className="text-sm font-semibold text-brand-600">Ver trabajos →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Historia */}
      <section id="historia" className="scroll-mt-20 bg-white py-20">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Image src="/img/mecanico2.jpg" alt="Nuestro taller" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow">Nuestra historia</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Quiénes somos</h2>
            {HISTORY.map((p) => <p key={p.slice(0, 20)} className="mt-4 text-ink-600">{p}</p>)}
          </div>
        </div>
      </section>

      {/* Marcas + CTA */}
      <section className="container py-16 text-center">
        <p className="eyebrow mb-6">Estas empresas confían en nosotros</p>
        <Image src="/img/marcas_rectangular.png" alt="Marcas de autos" width={970} height={308} className="mx-auto h-auto w-full max-w-3xl opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
        <div className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-10 text-left text-white md:p-14">
          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-volt-400/30 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-black uppercase md:text-4xl">Agenda tu hora</h2>
              <p className="mt-2 max-w-lg text-brand-100">…y prontamente tendrás tu auto contigo. Elige especialidad, día y hora con disponibilidad real.</p>
            </div>
            <Link href="/agenda" className="inline-flex h-13 items-center gap-2 self-start rounded-xl bg-volt-400 px-7 py-3.5 font-bold text-ink-950 hover:bg-volt-300 md:self-auto">
              <CalendarCheck className="h-5 w-5" /> Agendar ahora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
