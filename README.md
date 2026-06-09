# Mini Motos · Ciudad Real

Tienda online premium, scroll-driven, para **Mini Motos** (Avenida de Valdepeñas, 13004 Ciudad Real).
Venta y taller de minimotos, mini quads, pit bikes, buggies (gasolina y eléctricas), equipación cross y recambios.

Estética fijada: **negro profundo + espectro neón RGB + cromo + velocidad**. Todo "ladeado" con intención.

## Stack

- **Next.js 16** (App Router, RSC, Server Actions) · **TypeScript strict**
- **Tailwind CSS v4** (CSS-first `@theme`, tokens en `src/app/globals.css`)
- **Lenis** (smooth scroll) + **GSAP** (ScrollTrigger, SplitText, Observer, Flip)
- **Three.js + R3F** (shader del hero, WebGL con fallback CSS)
- **Zustand** (carrito + UI, persist en localStorage)
- **Supabase** (Postgres + RLS) — opcional; sin credenciales la app usa datos *mock*
- **MapLibre GL** (mapa de la tienda)
- **next-intl** — ES por defecto (sin prefijo), EN en `/en`
- **Stripe** — scaffolded pero **desactivado** (`STRIPE_ENABLED=false`); checkout actual vía **WhatsApp**

## Arrancar

```bash
pnpm install
cp .env.local.example .env.local   # rellena lo que tengas (todo opcional para dev)
pnpm dev                            # http://localhost:3000
pnpm build && pnpm start           # producción
```

La app funciona **sin backend**: catálogo, filtros, carrito y checkout-WhatsApp van con datos *mock*
marcados (`· DEMO`, `placeholder:true`). Al conectar Supabase, la capa de datos pasa a usarlo
automáticamente (`src/lib/data/`).

## Decisiones (Fase 0)

| | |
|---|---|
| Idiomas | ES (sin prefijo) + EN (`/en`) |
| Checkout | WhatsApp en vivo · Stripe diferido tras `STRIPE_ENABLED` |
| Reduced-motion | **No** se respeta (full estética) — flag `MOTION_RESPECT_REDUCED` |
| Momento signature | Galería horizontal pin+scrub |
| Assets | Hero = shader WebGL (sin foto). Producto = placeholders branded honestos |

## Las 4 leyes

1. **Cero 3D modelado** — profundidad por foto/parallax/shaders sobre imagen + CSS 3D.
2. **Cero datos inventados** — sin reseñas/marcas/precios/stock falsos. Todo pendiente va marcado.
3. **El detalle es el producto.**
4. **Todo ladeado con intención.**

## Pendiente de datos reales (`TODO:DATO-REAL`)

Centralizado en `src/lib/site.ts`:

- Teléfono / WhatsApp reales
- Año de apertura
- **Horario** (actualmente **inventado** con permiso, badge abierto/cerrado en vivo)
- Marcas que distribuye la tienda
- Fotos reales de producto y material cinematográfico del hero
- Reseñas reales (sección testimonios vacía a propósito)
- Logo real (sustituye el mark de `src/components/layout/Logo.tsx`)
- Coordenadas exactas de la tienda (afinar `site.geo`)

Plantillas legales (`src/lib/legal.ts`) marcadas `TODO:REVISIÓN-JURÍDICA`.

## Variables de entorno

Ver `.env.local.example`. Todas opcionales en dev. Para activar:

- **Supabase**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Stripe** (cuando toque): `STRIPE_ENABLED=true`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- **Admin** (`/admin`): `ADMIN_PASSWORD`

## Estructura

```
src/
  app/[locale]/        páginas públicas (home, tienda, servicios, nosotros, contacto, carrito, legales)
  app/admin/           panel CRUD (gated por ADMIN_PASSWORD)
  app/api/             checkout + webhook Stripe (inertes)
  app/actions/         Server Actions (newsletter, contacto, admin)
  components/          ui · layout · home · shop · contact · admin · webgl · seo · legal
  lib/                 site config · data (mock/supabase) · motion · stripe · auth · utils · legal
  store/               Zustand (cart, ui)
  i18n/                next-intl routing
supabase/migrations/   schema + RLS · seed.sql (placeholders)
```

## Base de datos

`supabase/migrations/0001_init.sql` (categorias, productos, pedidos, newsletter + RLS).
`supabase/seed.sql` solo inserta placeholders en estado `borrador`.

---

Hecho en Ciudad Real.
