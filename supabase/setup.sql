-- ILM Hub — Supabase setup
-- Run once in Supabase → SQL Editor on a fresh project. Safe to re-run.
-- Before running, replace the email in step 5 with the admin's login email.

-- 1. Site content (one JSON row, id = 'main', holding the English + Uzbek bundle)
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

-- 2. Admin allowlist — only these emails may edit content or upload media.
--    No API policies on purpose: the list is managed here in the SQL Editor only.
create table if not exists public.site_admins (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);

alter table public.site_admins enable row level security;

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.site_admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to anon, authenticated;

-- Everyone can read the site content; only admins can change it
drop policy if exists "Public read site content" on public.site_content;
create policy "Public read site content"
  on public.site_content for select
  to anon, authenticated
  using (true);

drop policy if exists "Auth write site content" on public.site_content;
drop policy if exists "Admins write site content" on public.site_content;
create policy "Admins write site content"
  on public.site_content for all
  to authenticated
  using (public.is_site_admin())
  with check (public.is_site_admin());

-- 3. Storage bucket for photos and videos (public read, 50 MB per file = Free plan limit)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 52428800, array['image/*', 'video/*'])
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read media" on storage.objects;
create policy "Public read media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "Auth upload media" on storage.objects;
drop policy if exists "Admins upload media" on storage.objects;
create policy "Admins upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_site_admin());

drop policy if exists "Auth update media" on storage.objects;
drop policy if exists "Admins update media" on storage.objects;
create policy "Admins update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_site_admin());

drop policy if exists "Auth delete media" on storage.objects;
drop policy if exists "Admins delete media" on storage.objects;
create policy "Admins delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_site_admin());

-- 4. Content row. Left empty: the site shows its built-in content until the first Save in /admin.
insert into public.site_content (id, data)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

-- 5. Admin emails — replace with the email you will sign in with (add more rows for more admins)
insert into public.site_admins (email)
values (lower('admin@example.com'))
on conflict (email) do nothing;
