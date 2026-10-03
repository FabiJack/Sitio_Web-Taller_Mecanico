# Taller Rayo McQueen — sitio web

Sitio oficial del taller, reconstruido en **Next.js 15 + TypeScript + Tailwind** como sitio **estático** (se publica en cualquier hosting, sin servidor). Forma parte de la plataforma [TuercApp](https://github.com/FabiJack/Tuercapp):

- **Este repo:** sitio de marca y SEO del taller. Incluye especialidades, trabajos realizados, equipo, historia y la **agenda online en vivo**.
- **TuercApp** (API NestJS + PostgreSQL, web Next.js y app React Native): tienda de repuestos, seguimiento del auto, cuenta del cliente y panel del taller.

## Qué cambió respecto del proyecto semestral

| Antes (`legacy/`) | Ahora |
|---|---|
| 9 páginas HTML con Bootstrap y estilos duplicados | Sitio Next.js con componentes, diseño responsive y una sola fuente de contenido (`src/lib/content.ts`) |
| `agenda.html` + `action_page.php`: solo saludaba, sin guardar la hora | `/agenda` reserva **de verdad** en la API de TuercApp, con horas disponibles reales y código de reserva |
| Horas fijas (09:00–17:00) sin control de cupos | Bloques calculados según el horario, la colación y la capacidad de bahías del taller |
| “Trabajos realizados” en tablas | `/especialidades/[slug]` con fichas por trabajo (diagnóstico, fecha, mecánico, herramientas) |
| Buscador y login sin funcionar | Enlaces a la tienda, el seguimiento y la cuenta en TuercApp |

El sitio original se conserva sin cambios en [`legacy/`](legacy/) y la documentación del curso (wireframe y casos de uso) sigue en [`Docs/`](Docs/).

## Desarrollo

```bash
npm install
cp .env.example .env.local     # URL de la API y de la app de TuercApp
npm run dev                    # http://localhost:3002
npm run build                  # genera el sitio estático en out/
npm start                      # sirve out/ en :3002
```

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_API_URL` | API de TuercApp (agenda). Agrega el origen del sitio a `CORS_ORIGIN` en la API |
| `NEXT_PUBLIC_WORKSHOP` | Slug del taller en TuercApp (`rayo-mcqueen`) |
| `NEXT_PUBLIC_APP_URL` | Web de TuercApp (tienda, seguimiento y cuenta) |

Si la API no responde, la agenda ofrece agendar por WhatsApp.

> **Nota de marca:** “Rayo McQueen” es un personaje registrado de Disney/Pixar. Para un uso comercial conviene renombrar el taller. Las imágenes del personaje del proyecto original quedaron solo en `legacy/`.
