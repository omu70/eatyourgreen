-- Eat Your Green — admin schema
-- Run this in Supabase → SQL Editor → New query → Run.

-- ---------- LEADS (email captures) ----------
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  name        text,
  message     text,
  source      text,            -- 'lead-magnet' | 'contact' | ...
  created_at  timestamptz not null default now()
);
create index if not exists leads_created_idx on public.leads (created_at desc);

-- ---------- ORDERS (payments) ----------
create table if not exists public.orders (
  id                   uuid primary key default gen_random_uuid(),
  razorpay_order_id    text,
  razorpay_payment_id  text,
  plan                 text,         -- book slug / alias
  product_title        text,
  amount               integer,      -- in paise
  currency             text default 'INR',
  status               text default 'paid',
  email                text,
  created_at           timestamptz not null default now()
);
create index if not exists orders_created_idx on public.orders (created_at desc);
create unique index if not exists orders_payment_uidx on public.orders (razorpay_payment_id);

-- ---------- PRODUCTS (editable books) ----------
create table if not exists public.products (
  slug             text primary key,
  title            text not null,
  tagline          text,
  subhead          text,
  price            integer not null default 0,
  old_price        integer not null default 0,
  cover            text,
  pdf              text,
  accent           text default 'brand',
  badge            text,
  for_who          text,
  pages            text,
  format           text,
  whats_inside     jsonb default '[]'::jsonb,
  outcomes         jsonb default '[]'::jsonb,
  gallery          jsonb default '[]'::jsonb,
  faqs             jsonb default '[]'::jsonb,
  cta_label        text,
  meta_title       text,
  meta_description text,
  sort             integer default 0,
  active           boolean default true,
  updated_at       timestamptz not null default now()
);

-- ---------- SITE CONTENT (editable copy, single row) ----------
create table if not exists public.site_content (
  id         integer primary key default 1,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_content_singleton check (id = 1)
);
insert into public.site_content (id, data) values (1, '{}'::jsonb)
  on conflict (id) do nothing;

-- ---------- Row Level Security ----------
-- All access happens server-side via the service-role key (which bypasses RLS).
-- So we enable RLS and add NO public policies = no anonymous access. Safe by default.
alter table public.leads        enable row level security;
alter table public.orders       enable row level security;
alter table public.products     enable row level security;
alter table public.site_content enable row level security;

-- Public (anon) may READ products + site content (they're public marketing data).
drop policy if exists "public read products" on public.products;
create policy "public read products" on public.products for select using (true);
drop policy if exists "public read content" on public.site_content;
create policy "public read content" on public.site_content for select using (true);
