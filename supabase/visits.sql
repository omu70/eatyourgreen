-- Eat Your Green — visitor analytics. Run once in Supabase → SQL Editor.
-- Stores ANONYMOUS visit data only (no name, email or phone — those don't exist to capture).

create table if not exists public.visits (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  visitor_id text,          -- anonymous browser id (cookie), not a person
  is_new boolean default false,
  path text,                -- page they viewed
  referrer text,            -- where they came from (raw)
  source text,              -- tidied source: instagram / google / direct ...
  country text,
  region text,
  city text,                -- city-level only, derived from network (no exact address)
  device text,              -- mobile / tablet / desktop
  browser text
);

create index if not exists visits_created_idx on public.visits (created_at desc);
create index if not exists visits_visitor_idx on public.visits (visitor_id);

-- Lock it down: no public/anon access. The server reads/writes with the service-role key.
alter table public.visits enable row level security;
