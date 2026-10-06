# Plantilla de sitio web para talleres mecánicos

Sitio de marketing **configurable** para cualquier taller, hecho con **Next.js 15, TypeScript y Tailwind**. Se exporta como sitio **estático** y se publica en cualquier hosting, sin servidor. Forma parte de la plataforma de marca blanca [TuercApp](https://github.com/FabiJack/Tuercapp):

- **Este repo:** sitio de marca y SEO del taller (especialidades, trabajos realizados, equipo, historia) con **agenda online en vivo**.
- **TuercApp** (API NestJS + PostgreSQL, web Next.js y app React Native): tienda de repuestos, seguimiento del auto, cuenta del cliente y panel del taller.

## Adaptarlo a tu taller

1. Edita [`src/lib/content.ts`](src/lib/content.ts): nombre, titular, eslogan, insignia de confianza, contacto, horario, especialidades, trabajos realizados, equipo e historia. Todo el contenido incluido es **de ejemplo** (“Taller Central”). La institución mencionada en la historia (Duoc UC) es solo ilustrativa.
2. Configura las variables (`.env.local`):

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_NAME` | Nombre del taller (sobrescribe el de `content.ts`) |
| `NEXT_PUBLIC_BRAND_COLOR` | Color de marca en hex; se genera la paleta completa |
| `NEXT_PUBLIC_API_URL` | API de TuercApp (agenda). Agrega el origen del sitio a `CORS_ORIGIN` en la API |
| `NEXT_PUBLIC_WORKSHOP` | Slug del taller en TuercApp |
| `NEXT_PUBLIC_APP_URL` | Web de TuercApp (tienda, seguimiento y cuenta) |

3. Reemplaza las fotos de `public/img/` (las incluidas son genéricas) y, si tienes logo, el isotipo `LogoMark` en `src/components/chrome.tsx`.

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3002
npm run build      # sitio estático en out/
npm start          # sirve out/ en :3002
```

Si la API no responde, la agenda ofrece agendar por WhatsApp.

## Origen

Nació como el proyecto semestral “sitio web de taller mecánico”: 9 páginas HTML con Bootstrap y un formulario PHP que no guardaba las reservas. El sitio original se conserva sin cambios en [`legacy/`](legacy/) y la documentación del curso (wireframe y casos de uso) sigue en [`Docs/`](Docs/).

| Antes (`legacy/`) | Ahora |
|---|---|
| Contenido y marca fijos en cada HTML | Una sola fuente de configuración (`content.ts` + variables de entorno) |
| `agenda.html` + `action_page.php`: solo saludaba | `/agenda` reserva en TuercApp con horas reales y código de reserva |
| Horas fijas sin control de cupos | Bloques según el horario, la colación y las bahías del taller |
| “Trabajos realizados” en tablas | `/especialidades/[slug]` con fichas por trabajo |
