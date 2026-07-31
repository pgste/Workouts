-- Court Strength — initial Supabase schema.
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query → paste → Run).
--
-- Model: app-level athlete ids ('lewis', 'paul', 'coach') scope every row.
-- Auth users map to an athlete + role via `profiles`. RLS is the security
-- boundary — the anon key ships in the static site, so policies are what
-- actually protect the data.

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Profiles — maps an auth user to an athlete id and role.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  athlete_id text,
  role text not null default 'athlete' check (role in ('athlete', 'coach')),
  created_at timestamptz not null default now()
);

-- A blank profile is created on signup; an admin then assigns athlete_id/role
-- (see the README's mapping snippet). Until mapped, a user can sign in but
-- can't read or write any progress rows.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (user_id) values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helpers used by the policies.
create or replace function public.my_athlete_id()
returns text
language sql stable security definer set search_path = public
as $$
  select athlete_id from public.profiles where user_id = auth.uid();
$$;

create or replace function public.is_coach()
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce(
    (select role = 'coach' from public.profiles where user_id = auth.uid()),
    false
  );
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Plans — one jsonb document per athlete: the PLANS[athleteId] object
--    verbatim (blocks → weeks → days → workouts). Written only by the
--    publish-plans workflow (service role); clients read.
-- ─────────────────────────────────────────────────────────────────────────────

create table public.plans (
  athlete_id text primary key,
  data jsonb not null,
  version int not null default 1,
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. Progress — mirrors the app's localStorage shapes, one row per record so
--    per-record last-write-wins sync works.
-- ─────────────────────────────────────────────────────────────────────────────

-- One row per logged day: data = { sets, ticks, completed, date, name, detail, updatedAt }.
create table public.day_records (
  athlete_id text not null,
  day_id text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (athlete_id, day_id)
);

-- Append-only court-load log. Ids are client-generated so re-pushes are idempotent.
create table public.court_entries (
  id uuid primary key,
  athlete_id text not null,
  date date not null,
  type text,
  mins int,
  rpe int,
  load int,
  created_at timestamptz not null default now()
);

-- One row per readiness morning: data = { "<field label>": "<value>", ... }.
create table public.readiness_rows (
  athlete_id text not null,
  date date not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (athlete_id, date)
);

create index court_entries_athlete_date on public.court_entries (athlete_id, date);

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. Row-level security
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.plans enable row level security;
alter table public.day_records enable row level security;
alter table public.court_entries enable row level security;
alter table public.readiness_rows enable row level security;

-- profiles: users see their own mapping (needed by the app to learn who it is).
create policy "read own profile" on public.profiles
  for select using (user_id = auth.uid());

-- plans: any signed-in user can read every plan (coach view reads both
-- athletes). No insert/update/delete policies — writes are service-role only.
create policy "read plans" on public.plans
  for select using (auth.role() = 'authenticated');

-- progress: full access to your own athlete's rows; coaches additionally read
-- everyone. The coach's own ticks are stored under athlete_id 'coach', so the
-- "own rows" rule covers them once the coach profile is mapped to 'coach'.
create policy "own day records" on public.day_records
  for all
  using (athlete_id = public.my_athlete_id())
  with check (athlete_id = public.my_athlete_id());
create policy "coach reads day records" on public.day_records
  for select using (public.is_coach());

create policy "own court entries" on public.court_entries
  for all
  using (athlete_id = public.my_athlete_id())
  with check (athlete_id = public.my_athlete_id());
create policy "coach reads court entries" on public.court_entries
  for select using (public.is_coach());

create policy "own readiness" on public.readiness_rows
  for all
  using (athlete_id = public.my_athlete_id())
  with check (athlete_id = public.my_athlete_id());
create policy "coach reads readiness" on public.readiness_rows
  for select using (public.is_coach());
