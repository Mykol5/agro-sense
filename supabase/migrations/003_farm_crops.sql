create table if not exists public.farm_crops (
  id uuid primary key default gen_random_uuid(),

  farm_id uuid not null
    references public.farms(id)
    on delete cascade,

  crop_name text not null,
  variety text,
  planting_date date,
  growth_stage text,
  area numeric,

  created_at timestamptz not null default now()
);

alter table public.farm_crops enable row level security;

drop policy if exists "Users can view crops on their own farms"
on public.farm_crops;

create policy "Users can view crops on their own farms"
on public.farm_crops
for select
to authenticated
using (
  exists (
    select 1
    from public.farms
    where farms.id = farm_crops.farm_id
      and farms.user_id = auth.uid()
  )
);

drop policy if exists "Users can create crops on their own farms"
on public.farm_crops;

create policy "Users can create crops on their own farms"
on public.farm_crops
for insert
to authenticated
with check (
  exists (
    select 1
    from public.farms
    where farms.id = farm_crops.farm_id
      and farms.user_id = auth.uid()
  )
);

drop policy if exists "Users can update crops on their own farms"
on public.farm_crops;

create policy "Users can update crops on their own farms"
on public.farm_crops
for update
to authenticated
using (
  exists (
    select 1
    from public.farms
    where farms.id = farm_crops.farm_id
      and farms.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.farms
    where farms.id = farm_crops.farm_id
      and farms.user_id = auth.uid()
  )
);

drop policy if exists "Users can delete crops on their own farms"
on public.farm_crops;

create policy "Users can delete crops on their own farms"
on public.farm_crops
for delete
to authenticated
using (
  exists (
    select 1
    from public.farms
    where farms.id = farm_crops.farm_id
      and farms.user_id = auth.uid()
  )
);