-- ILM Hub Admin — run this in Supabase SQL Editor (once)

create table if not exists public.site_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Public read site content" on public.site_content;
create policy "Public read site content"
  on public.site_content for select
  to anon, authenticated
  using (true);

drop policy if exists "Auth write site content" on public.site_content;
create policy "Auth write site content"
  on public.site_content for all
  to authenticated
  using (true)
  with check (true);

insert into public.site_content (id, data)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

-- Storage bucket for photos (also create "media" as public in Dashboard → Storage if needed)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public read media" on storage.objects;
create policy "Public read media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "Auth upload media" on storage.objects;
create policy "Auth upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "Auth update media" on storage.objects;
create policy "Auth update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

drop policy if exists "Auth delete media" on storage.objects;
create policy "Auth delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
