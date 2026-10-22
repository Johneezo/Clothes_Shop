-- STYLEBOX database setup (run once in Supabase SQL Editor)
-- This creates a public product catalogue and an admin allowlist.
-- IMPORTANT: after creating your admin user in Supabase Authentication, insert their UUID into public.admins.

create extension if not exists pgcrypto;

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  category text not null default 'Unisex',
  price numeric(10,2) not null default 0 check (price >= 0),
  description text not null default '',
  tag text not null default 'NEW ARRIVAL',
  sizes text[] not null default array['One size']::text[],
  colours jsonb not null default '[]'::jsonb,
  image_urls text[] not null default '{}'::text[],
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_stylebox_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function public.is_stylebox_admin() from public;
grant execute on function public.is_stylebox_admin() to anon, authenticated;

drop trigger if exists products_set_updated_at on public.products;
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();

alter table public.products enable row level security;
alter table public.admins enable row level security;

drop policy if exists "Anyone can view published products" on public.products;
create policy "Anyone can view published products" on public.products
for select to anon, authenticated using (published = true or public.is_stylebox_admin());

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products" on public.products
for insert to authenticated with check (public.is_stylebox_admin());

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products" on public.products
for update to authenticated using (public.is_stylebox_admin()) with check (public.is_stylebox_admin());

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products" on public.products
for delete to authenticated using (public.is_stylebox_admin());

drop policy if exists "Admins can read admin allowlist" on public.admins;
create policy "Admins can read admin allowlist" on public.admins
for select to authenticated using (user_id = auth.uid());

-- Product image storage. Create a PUBLIC bucket named product-images in Storage if it does not exist.
-- Public read is intentional so customers can see product photos; only allowlisted admins can upload/edit/delete.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view StyleBox product images" on storage.objects;
create policy "Public can view StyleBox product images" on storage.objects
for select to anon, authenticated using (bucket_id = 'product-images');

drop policy if exists "StyleBox admins upload product images" on storage.objects;
create policy "StyleBox admins upload product images" on storage.objects
for insert to authenticated with check (bucket_id = 'product-images' and public.is_stylebox_admin());

drop policy if exists "StyleBox admins update product images" on storage.objects;
create policy "StyleBox admins update product images" on storage.objects
for update to authenticated using (bucket_id = 'product-images' and public.is_stylebox_admin())
with check (bucket_id = 'product-images' and public.is_stylebox_admin());

drop policy if exists "StyleBox admins delete product images" on storage.objects;
create policy "StyleBox admins delete product images" on storage.objects
for delete to authenticated using (bucket_id = 'product-images' and public.is_stylebox_admin());

-- After you create your user under Authentication > Users, run this with their actual UUID:
-- insert into public.admins (user_id) values ('PASTE-AUTH-USER-UUID-HERE');
