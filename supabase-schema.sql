-- Supabase schema for classifieds board

-- Table: site_settings
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text not null,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Seed single settings row (safe upsert)
insert into public.site_settings (id, site_name)
values ('00000000-0000-0000-0000-000000000001', 'Minutka')
on conflict (id) do nothing;

-- Table: categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  created_at timestamptz not null default now()
);

-- Seed example categories
insert into public.categories (slug, title)
values
  ('restaurants', 'Restoranlar'),
  ('products', 'Mahsulotlar'),
  ('couriers', 'Kuryerlar')
on conflict (slug) do nothing;

-- Table: ads
create table if not exists public.ads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price numeric,
  city text,
  contact_phone text,
  category_id uuid references public.categories (id) on delete set null,
  images text[],
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.site_settings enable row level security;
alter table public.categories enable row level security;
alter table public.ads enable row level security;

-- Public read-only access policies
create policy "Public read site settings"
  on public.site_settings
  for select
  using (true);

create policy "Public read categories"
  on public.categories
  for select
  using (true);

create policy "Public read published ads"
  on public.ads
  for select
  using (is_published = true);

-- Admin upsert/update/delete policies should be created in Supabase UI
-- by granting full access to authenticated users with role 'admin'.

