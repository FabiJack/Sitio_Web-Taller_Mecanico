/**
 * Contenido migrado del sitio original (legacy/html): especialidades,
 * trabajos realizados, equipo e historia del taller.
 */

export const WORKSHOP = {
  name: 'Taller Rayo McQueen',
  tagline: 'Somos tan rápidos como Rayo McQueen',
  address: 'Av. Vicuña Mackenna 4917, San Joaquín, Santiago',
  phone: '+56 2 2345 6789',
  whatsapp: '+56 9 8765 4321',
  email: 'contacto@rayomcqueen.cl',
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

export const HISTORY = [
  'Somos un grupo de mecánicos profesionales egresados de la carrera de Mecánica Automotriz del Instituto Duoc UC. Decidimos poner en funcionamiento un taller mecánico para aplicar las habilidades que adquirimos a lo largo de la carrera.',
  'Cada socio aporta su experiencia: uno es especialista en electrónica automotriz, otro en cajas de cambio y otro en suspensión y dirección. En conjunto prestamos un servicio completo para vehículos bencineros y diésel.',
];
