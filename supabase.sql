create table if not exists public.replay_projects (
  id text primary key,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.replay_projects enable row level security;

create policy "Public can read replay projects"
  on public.replay_projects for select using (true);

create policy "Public can create replay projects"
  on public.replay_projects for insert with check (true);

create policy "Public can update replay projects"
  on public.replay_projects for update using (true) with check (true);
