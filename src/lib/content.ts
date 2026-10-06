/**
 * ARCHIVO DE CONFIGURACIÓN DE LA PLANTILLA.
 * Cada taller edita este archivo (o las variables NEXT_PUBLIC_*) con su marca,
 * contacto, especialidades e historia. Los valores incluidos son de EJEMPLO.
 * Las especialidades y trabajos provienen del proyecto original (legacy/html).
 */

export const WORKSHOP = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Taller Central',
  legalName: 'Taller Central SpA',
  /** Titular del hero: [línea blanca, línea destacada en color de marca] */
  headline: ['Tu auto en manos', 'de especialistas'] as const,
  tagline: 'Mecánica especializada, presupuesto transparente y repuestos con instalación',
  /** Insignia de confianza (ej. formación, certificación o garantía) */
  credential: { title: 'Mecánicos titulados', detail: 'formación técnica profesional' },
  /** Color principal de la marca (hex) */
  brandColor: process.env.NEXT_PUBLIC_BRAND_COLOR ?? '#e51414',
  city: 'Santiago',
  address: 'Av. Principal 1234, Santiago',
  phone: '+56 2 2345 6789',
  whatsapp: '+56 9 8765 4321',
  email: 'contacto@demo.cl',
  hours: ['Lun a Vie 09:00–18:00', 'Sáb 09:00–13:00', 'Dom cerrado'],
};

export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export interface Job {
  title: string;
  diagnosis: string;
  date: string;
  tools: string[];
}

export interface Specialty {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: 'cpu' | 'cog' | 'car';
  images: string[];
  mechanic: { name: string; initials: string };
  services: string[];
  jobs: Job[];
  /** slug del servicio en TuercApp para preseleccionarlo en la agenda */
  serviceSlug: string;
}

export const SPECIALTIES: Specialty[] = [
  {
    slug: 'electronica-automotriz',
    name: 'Electrónica automotriz',
    short: 'Scanner multimarca, sensores, cableado y fusibles.',
    description:
      'Diagnóstico con scanner multimarca y software especializado. Detectamos cortocircuitos, fallas de sensores y problemas de cableado antes de que te dejen botado.',
    icon: 'cpu',
    images: ['/img/electronica1.jpg', '/img/electronica2.jpg'],
    mechanic: { name: 'Ricardo Maturana Quintero', initials: 'RM' },
    services: ['Lectura de códigos de falla', 'Análisis de sensores en vivo', 'Cableado y fusibles', 'Baterías y alternadores'],
    jobs: [
      { title: 'Cambio de fusibles y cableado', diagnosis: 'Cortocircuito', date: '2022-06-14', tools: ['Tester', 'Alicate'] },
      { title: 'Mantención electrónica', diagnosis: 'Mantención periódica', date: '2022-05-20', tools: ['Software de diagnóstico', 'Tester'] },
    ],
    serviceSlug: 'diagnostico-electronico',
  },
  {
    slug: 'cajas-de-cambio',
    name: 'Cajas de cambio',
    short: 'Mecánicas y automáticas, embragues y sincronizadores.',
    description:
      'Reparamos y mantenemos cajas mecánicas y automáticas: rotura de piñones, embragues, sincronizadores y cambio de aceite de caja con repuestos de calidad.',
    icon: 'cog',
    images: ['/img/caja1.jpg', '/img/caja2.jpg'],
    mechanic: { name: 'Rodrigo Méndez Quintanilla', initials: 'RM' },
    services: ['Reparación de piñones', 'Cambio de embrague', 'Mantención de caja automática', 'Cambio de aceite de caja'],
    jobs: [
      { title: 'Arreglo de caja de cambio', diagnosis: 'Rotura de piñón', date: '2022-05-15', tools: ['Atornillador eléctrico', 'Extractor'] },
      { title: 'Mantención de caja de cambio', diagnosis: 'Limpieza', date: '2022-05-18', tools: ['Llave inglesa', 'Prensa'] },
    ],
    serviceSlug: 'cajas-de-cambio',
  },
  {
    slug: 'suspension-y-direccion',
    name: 'Suspensión y dirección',
    short: 'Amortiguadores, rótulas, terminales y alineación.',
    description:
      'Eliminamos ruidos, vibraciones y desgaste irregular de neumáticos. Cambio de amortiguadores, rótulas y terminales, y corrección de la angulación de la dirección.',
    icon: 'car',
    images: ['/img/sus_direc1.jpg', '/img/mecanico2.jpg'],
    mechanic: { name: 'Roberto Maluenda Quiroz', initials: 'RM' },
    services: ['Cambio de amortiguadores', 'Rótulas y terminales', 'Cremallera de dirección', 'Alineación y balanceo'],
    jobs: [
      { title: 'Cambio de suspensión', diagnosis: 'Rotura de amortiguador', date: '2022-06-14', tools: ['Atornillador eléctrico', 'Gata'] },
      { title: 'Arreglo de dirección', diagnosis: 'Pérdida de angulación', date: '2022-05-12', tools: ['Llave inglesa', 'Prensa'] },
    ],
    serviceSlug: 'suspension-y-direccion',
  },
];

/** Texto de ejemplo: la institución mencionada (Duoc UC) es solo ilustrativa. */
export const HISTORY = [
  'Somos un grupo de mecánicos titulados en Mecánica Automotriz (por ejemplo, del Instituto Duoc UC). Decidimos poner en funcionamiento un taller mecánico para aplicar las habilidades que adquirimos a lo largo de la carrera.',
  'Cada socio aporta su experiencia: uno es especialista en electrónica automotriz, otro en cajas de cambio y otro en suspensión y dirección. En conjunto prestamos un servicio completo para vehículos bencineros y diésel.',
];

/** Paleta 50…950 derivada del color de marca (mismo algoritmo que @tuercapp/shared). */
export function brandCss(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  const rgb = [0, 2, 4].map((i) => parseInt((m ? m[1] : 'e51414').slice(i, i + 2), 16));
  const mix = (t: number, a: number) => rgb.map((c) => Math.round(c + (t - c) * a)).join(' ');
  const shades: Record<number, string> = {
    50: mix(255, 0.95), 100: mix(255, 0.9), 200: mix(255, 0.78), 300: mix(255, 0.6), 400: mix(255, 0.38),
    500: mix(255, 0.16), 600: rgb.join(' '), 700: mix(0, 0.16), 800: mix(0, 0.3), 900: mix(0, 0.45), 950: mix(0, 0.68),
  };
  return `:root{${Object.entries(shades).map(([k, v]) => `--brand-${k}:${v}`).join(';')}}`;
}
