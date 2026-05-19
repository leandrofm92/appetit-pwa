-- APPetit+ Supabase Schema
-- Run this in the Supabase SQL editor

-- Enable extensions
create extension if not exists "uuid-ossp";

-- =====================
-- PROFILES
-- =====================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text not null,
  avatar_url text,
  role text not null default 'client' check (role in ('client', 'nutritionist')),
  subscription_tier text not null default 'free' check (subscription_tier in ('free', 'premium')),
  stripe_customer_id text unique,
  stripe_subscription_id text,
  bio text,
  specialization text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Profiles are viewable by authenticated users"
  on profiles for select using (auth.role() = 'authenticated');

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'client')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================
-- RECIPES
-- =====================
create table public.recipes (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  image_url text,
  video_url text,
  ingredients jsonb not null default '[]',
  instructions jsonb not null default '[]',
  nutritional_info jsonb not null default '{}',
  prep_time_min integer not null default 0,
  cook_time_min integer not null default 0,
  servings integer not null default 1,
  category text not null,
  tags text[] default '{}',
  author_id uuid references public.profiles(id) on delete cascade not null,
  is_published boolean default false,
  created_at timestamptz default now()
);

alter table public.recipes enable row level security;

create policy "Published recipes are viewable by all"
  on recipes for select using (is_published = true);

create policy "Nutritionists can manage their recipes"
  on recipes for all using (
    auth.uid() = author_id
  );

-- =====================
-- SAVED RECIPES
-- =====================
create table public.saved_recipes (
  user_id uuid references public.profiles(id) on delete cascade,
  recipe_id uuid references public.recipes(id) on delete cascade,
  saved_at timestamptz default now(),
  primary key (user_id, recipe_id)
);

alter table public.saved_recipes enable row level security;

create policy "Users can manage their saved recipes"
  on saved_recipes for all using (auth.uid() = user_id);

-- =====================
-- INGREDIENTS (search engine)
-- =====================
create table public.ingredients (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  aliases text[] default '{}',
  category text
);

-- Full-text search index on recipe ingredients
create index recipes_ingredients_gin on recipes using gin(ingredients);
create index recipes_tags_gin on recipes using gin(tags);

-- =====================
-- MEAL PLANS
-- =====================
create table public.meal_plans (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references public.profiles(id) on delete cascade not null,
  nutritionist_id uuid references public.profiles(id) on delete cascade not null,
  week_start date not null,
  plan jsonb not null default '{}',
  notes text,
  created_at timestamptz default now()
);

alter table public.meal_plans enable row level security;

create policy "Clients can view their meal plans"
  on meal_plans for select using (auth.uid() = client_id);

create policy "Nutritionists can manage meal plans"
  on meal_plans for all using (auth.uid() = nutritionist_id);

-- =====================
-- ARTICLES
-- =====================
create table public.articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  image_url text,
  video_url text,
  author_id uuid references public.profiles(id) on delete cascade not null,
  category text not null,
  tags text[] default '{}',
  read_time_min integer not null default 5,
  is_published boolean default false,
  created_at timestamptz default now()
);

alter table public.articles enable row level security;

create policy "Published articles are viewable by all"
  on articles for select using (is_published = true);

create policy "Nutritionists can manage their articles"
  on articles for all using (auth.uid() = author_id);

-- =====================
-- APPOINTMENTS
-- =====================
create table public.appointments (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references public.profiles(id) on delete cascade not null,
  nutritionist_id uuid references public.profiles(id) on delete cascade not null,
  scheduled_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  daily_room_url text,
  notes text,
  created_at timestamptz default now()
);

alter table public.appointments enable row level security;

create policy "Participants can view their appointments"
  on appointments for select using (
    auth.uid() = client_id or auth.uid() = nutritionist_id
  );

create policy "Nutritionists can manage appointments"
  on appointments for all using (auth.uid() = nutritionist_id);

create policy "Clients can create appointments"
  on appointments for insert with check (auth.uid() = client_id);

-- =====================
-- NOTIFICATIONS
-- =====================
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  body text not null,
  is_read boolean default false,
  type text not null check (type in ('new_content', 'appointment', 'meal_plan', 'system')),
  url text,
  created_at timestamptz default now()
);

alter table public.notifications enable row level security;

create policy "Users can view their notifications"
  on notifications for select using (auth.uid() = user_id);

create policy "Users can update their notifications"
  on notifications for update using (auth.uid() = user_id);

-- Enable realtime for notifications
alter publication supabase_realtime add table notifications;

-- =====================
-- STORAGE BUCKETS
-- =====================
-- Run in Supabase dashboard > Storage:
-- 1. Create bucket "recipe-images" (public)
-- 2. Create bucket "recipe-videos" (public)
-- 3. Create bucket "article-images" (public)
-- 4. Create bucket "article-videos" (public)
-- 5. Create bucket "avatars" (public)
