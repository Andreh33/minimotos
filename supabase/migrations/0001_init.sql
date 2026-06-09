-- ============================================================
-- MINI MOTOS · esquema inicial (§5 del prompt maestro)
-- ============================================================

-- ---- categorias --------------------------------------------------
create table if not exists categorias (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  nombre      text not null,
  descripcion text,
  imagen      text,
  orden       int default 0,
  parent_id   uuid references categorias(id),
  created_at  timestamptz default now()
);

-- ---- productos ---------------------------------------------------
create table if not exists productos (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  nombre        text not null,
  categoria_id  uuid references categorias(id),
  marca         text,
  tipo_energia  text check (tipo_energia in ('gasolina','electrica','na')) default 'na',
  precio        numeric(10,2) not null,
  precio_oferta numeric(10,2),
  destacado     boolean default false,
  estado        text check (estado in ('nuevo','oferta','agotado','publicado','borrador')) default 'borrador',
  stock         int default 0,
  cilindrada_cc int,
  potencia_w    int,
  velocidad_max int,
  autonomia_km  int,
  edad_min      int,
  descripcion   text,
  especificaciones jsonb default '{}'::jsonb,
  imagenes      jsonb default '[]'::jsonb,
  orden         int default 0,
  created_at    timestamptz default now()
);
create index if not exists productos_categoria_idx on productos(categoria_id);
create index if not exists productos_estado_idx on productos(estado);

-- ---- pedidos -----------------------------------------------------
create table if not exists pedidos (
  id            uuid primary key default gen_random_uuid(),
  estado        text default 'pendiente',
  items         jsonb not null,
  subtotal      numeric(10,2),
  total         numeric(10,2),
  cliente       jsonb,
  metodo        text check (metodo in ('stripe','whatsapp','contacto')),
  stripe_session_id text,
  created_at    timestamptz default now()
);

-- ---- newsletter (captura de email) -------------------------------
create table if not exists newsletter (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  locale     text default 'es',
  created_at timestamptz default now()
);

-- ============================================================
-- RLS
-- ============================================================
alter table categorias enable row level security;
alter table productos  enable row level security;
alter table pedidos    enable row level security;
alter table newsletter enable row level security;

-- Lectura pública de categorías
drop policy if exists "categorias_public_read" on categorias;
create policy "categorias_public_read" on categorias
  for select using (true);

-- Lectura pública de productos visibles
drop policy if exists "productos_public_read" on productos;
create policy "productos_public_read" on productos
  for select using (estado in ('publicado','nuevo','oferta','agotado'));

-- pedidos: sin acceso anónimo (insert vía service role en Server Action).
-- newsletter: permitir insert anónimo, sin lectura pública.
drop policy if exists "newsletter_anon_insert" on newsletter;
create policy "newsletter_anon_insert" on newsletter
  for insert with check (true);
