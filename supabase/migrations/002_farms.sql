create table if not exists public.farms (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  farm_name text not null,
  location text not null,
  farm_size numeric,
  farm_size_unit text not null default 'hectares',

  created_at timestamptz not null default now()
);

alter table public.farms enable row level security;

drop policy if exists "Users can view their own farms"
on public.farms;

create policy "Users can view their own farms"
on public.farms
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can create their own farms"
on public.farms;

create policy "Users can create their own farms"
on public.farms
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own farms"
on public.farms;

create policy "Users can update their own farms"
on public.farms
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own farms"
on public.farms;

create policy "Users can delete their own farms"
on public.farms
for delete
to authenticated
using (auth.uid() = user_id);