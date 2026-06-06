-- Eat Your Green — media storage for admin image uploads.
-- Run once in Supabase → SQL Editor.

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Anyone can READ images (public marketing assets).
drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');

-- Writes/deletes happen server-side via the service-role key (bypasses RLS).
