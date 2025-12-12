-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Destinations Table
create table if not exists destinations (
  id text primary key,
  name text not null,
  cat text not null,
  img text not null,
  rating float default 5.0,
  reviews int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Packages Table
create table if not exists packages (
  id text primary key,
  type text not null,
  tier text not null,
  title text not null,
  subtitle text,
  price int not null,
  price_label text,
  image text,
  features text[] default '{}',
  inclusions jsonb, -- Storing complex objects as JSONB
  itinerary jsonb, -- Storing complex objects as JSONB
  cancellation_policy text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Galleries Table
create table if not exists galleries (
  id uuid default uuid_generate_v4() primary key,
  destination_id text references destinations(id) on delete cascade,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Settings Table (for single row config)
create table if not exists app_settings (
  id int primary key default 1,
  whatsapp_number text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  constraint single_row check (id = 1)
);

-- Initial Data Seeding (Optional - only if you want to start fresh)
-- You can run this if tables are empty to prevent empty app state
-- insert into app_settings (id, whatsapp_number) values (1, '77078382129') on conflict do nothing;

-- Row Level Security (RLS)
-- For simplicity in this demo, we'll enable public read/write. 
-- IN PRODUCTION: You should restrict write access to authenticated users.

alter table destinations enable row level security;
alter table packages enable row level security;
alter table galleries enable row level security;
alter table app_settings enable row level security;

-- Policies (Public Read/Write for now)
create policy "Public Access Destinations" on destinations for all using (true) with check (true);
create policy "Public Access Packages" on packages for all using (true) with check (true);
create policy "Public Access Galleries" on galleries for all using (true) with check (true);
create policy "Public Access Settings" on app_settings for all using (true) with check (true);
