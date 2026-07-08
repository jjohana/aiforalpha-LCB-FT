create table if not exists training_users (
  email text primary key,
  name text not null,
  default_role text not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists training_sessions (
  session_id uuid primary key,
  email text not null references training_users(email) on delete cascade,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  user_agent text
);

create table if not exists training_progress (
  email text primary key references training_users(email) on delete cascade,
  name text not null,
  default_role text not null,
  is_admin boolean not null default false,
  login_count integer not null default 0,
  last_login_at timestamptz,
  total_time_ms bigint not null default 0,
  module_time_ms jsonb not null default '{}'::jsonb,
  latest_progress jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists training_attempts (
  attempt_id text primary key,
  email text not null references training_users(email) on delete cascade,
  completed_at timestamptz,
  saved_at timestamptz not null default now(),
  role text,
  role_label text,
  score integer not null default 0,
  correct_count integer not null default 0,
  answered_count integer not null default 0,
  total_questions integer not null default 0,
  modules_read integer not null default 0,
  total_modules integer not null default 7,
  passed boolean not null default false,
  training_passed boolean not null default false,
  time_spent_ms bigint not null default 0,
  payload jsonb not null default '{}'::jsonb
);

create table if not exists training_events (
  id bigserial primary key,
  email text references training_users(email) on delete set null,
  session_id uuid,
  event_type text not null,
  reason text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

insert into training_users (email, name, default_role, is_admin)
values
  ('eric.benhamou@aiforalpha.com', 'Eric Benhamou', 'compliance', true),
  ('beatrice.guez@aiforalpha.com', 'Béatrice Guez', 'compliance', true),
  ('jean-jacques.ohana@aiforalpha.com', 'Jean-Jacques Ohana', 'compliance', true),
  ('ethan.setrouk@aiforalpha.com', 'Ethan Setrouk', 'research', false),
  ('chamyl.saadi@aiforalpha.com', 'Chamyl Saadi', 'client', false),
  ('thomas.jacquot@aiforalpha.com', 'Thomas Jacquot', 'research', false)
on conflict (email) do update set
  name = excluded.name,
  default_role = excluded.default_role,
  is_admin = excluded.is_admin,
  updated_at = now();

alter table training_users enable row level security;
alter table training_sessions enable row level security;
alter table training_progress enable row level security;
alter table training_attempts enable row level security;
alter table training_events enable row level security;

drop policy if exists "training_users_public_app" on training_users;
drop policy if exists "training_sessions_public_app" on training_sessions;
drop policy if exists "training_progress_public_app" on training_progress;
drop policy if exists "training_attempts_public_app" on training_attempts;
drop policy if exists "training_events_public_app" on training_events;

create policy "training_users_public_app" on training_users
  for all using (true) with check (true);

create policy "training_sessions_public_app" on training_sessions
  for all using (true) with check (true);

create policy "training_progress_public_app" on training_progress
  for all using (true) with check (true);

create policy "training_attempts_public_app" on training_attempts
  for all using (true) with check (true);

create policy "training_events_public_app" on training_events
  for all using (true) with check (true);
