-- Eat Your Green — storage setup. Run once in Supabase → SQL Editor.

-- 1) PUBLIC bucket for site images (covers, photos, gallery, logo, QR).
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');

-- 2) PRIVATE bucket for paid PDFs. NOT public — there is intentionally NO read policy,
--    so the files can never be opened by URL. After a verified payment the server
--    creates a short-lived signed link using the service-role key.
insert into storage.buckets (id, name, public)
values ('downloads', 'downloads', false)
on conflict (id) do nothing;

-- 3) Column that stores each book's private PDF path (inside the 'downloads' bucket).
alter table public.products add column if not exists pdf_path text;

-- Image/file writes happen server-side via the service-role key (bypasses RLS).
