-- Villa Estelita CMS schema
-- Run this in Supabase Dashboard → SQL Editor
-- Then create the admin user in Authentication → Users:
--   Email: idiankert@gmail.com
--   Password: set securely in the Supabase dashboard (never commit to GitHub)

-- ─── Tables ───────────────────────────────────────────────────────────────

create table if not exists public.site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  storage_path text,
  public_url text not null,
  alt text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references auth.users (id) on delete set null,
  admin_email text,
  action text not null,
  entity text not null,
  details jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ─── Helpers ──────────────────────────────────────────────────────────────

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    lower(auth.jwt() ->> 'email') = 'idiankert@gmail.com',
    false
  );
$$;

create or replace function public.touch_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_content_updated_at on public.site_content;
create trigger site_content_updated_at
  before update on public.site_content
  for each row execute function public.touch_site_content_updated_at();

-- ─── RLS ──────────────────────────────────────────────────────────────────

alter table public.site_content enable row level security;
alter table public.gallery_images enable row level security;
alter table public.admin_logs enable row level security;

create policy "Public read site content"
  on public.site_content for select
  to anon, authenticated
  using (true);

create policy "Admin write site content"
  on public.site_content for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public read gallery"
  on public.gallery_images for select
  to anon, authenticated
  using (true);

create policy "Admin insert gallery"
  on public.gallery_images for insert
  to authenticated
  with check (public.is_admin());

create policy "Admin update gallery"
  on public.gallery_images for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin delete gallery"
  on public.gallery_images for delete
  to authenticated
  using (public.is_admin());

create policy "Admin read logs"
  on public.admin_logs for select
  to authenticated
  using (public.is_admin());

create policy "Admin insert logs"
  on public.admin_logs for insert
  to authenticated
  with check (public.is_admin());

-- ─── Storage ──────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gallery',
  'gallery',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

create policy "Public read gallery storage"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'gallery');

create policy "Admin upload gallery storage"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery' and public.is_admin());

create policy "Admin update gallery storage"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gallery' and public.is_admin())
  with check (bucket_id = 'gallery' and public.is_admin());

create policy "Admin delete gallery storage"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery' and public.is_admin());

-- ─── Seed default content ─────────────────────────────────────────────────

insert into public.site_content (key, value) values
(
  'rates',
  '{
    "packages": [
      {"title": "Daytime Rate", "time": "8:00 AM – 5:00 PM", "promo": 6499, "original": 7999, "note": ""},
      {"title": "Overnight Rate", "time": "7:00 PM – 6:00 AM", "promo": 7499, "original": 8999, "note": ""},
      {"title": "21 Hours", "time": "5:00 PM – 2:00 PM (next day)", "promo": 8499, "original": 9999, "note": "Per day · rate × number of days of stay", "jacuzzi_note": "Heated jacuzzi: 30 min free use (21-hour rate only)"}
    ],
    "inclusions_html": "<strong>Inclusions:</strong> 3 rooms · 3 extra mattresses · videoke<br /><strong>Capacity:</strong> Base rate covers up to 15 PAX · up to 15 PAX sleeping<br /><strong>Extra person:</strong> ₱150 per person above 15 PAX<br /><strong>Heated jacuzzi:</strong> 30 min complimentary use with 21-hour package only<br /><em>*Rates may change without notice.</em>",
    "details": [
      {"label": "Sleeping", "value": "Up to 15 PAX"},
      {"label": "Base Group", "value": "Up to 15 PAX"},
      {"label": "Extra Person", "value": "₱150 above 15"}
    ]
  }'::jsonb
),
(
  'policies',
  '{
    "items": [
      {"title": "Deposit", "text": "Non-refundable."},
      {"title": "Reservations", "text": "First come, first served."},
      {"title": "Check-in/out", "text": "Follow your package schedule. Valid ID required. No waiting area for early arrivals."},
      {"title": "Extra person", "text": "₱150 per person above 15 PAX."},
      {"title": "Heated jacuzzi", "text": "30 min free use — 21-hour rate only."},
      {"title": "Videoke & noise", "text": "Off at 10:00 PM (Pagsanjan ordinance)."},
      {"title": "Gas stove", "text": "₱500 fee — inform caretaker (Airbnb guests exempt)."},
      {"title": "Bring", "text": "Towels, toiletries, kitchen utensils, and charcoal for grilling."},
      {"title": "Pets", "text": "Allowed — keep outside rooms in cages."},
      {"title": "Staff", "text": "Last call at 8:00 PM (emergencies excepted)."},
      {"title": "Pool", "text": "Shower before swimming. No running. Adult supervision for children."},
      {"title": "Belongings", "text": "Keep items inside rooms — not outside or in vehicles."},
      {"title": "Occasions", "text": "Inform us for birthdays, company outings, or events."},
      {"title": "Directions", "text": "Search \"Villa Estelita Pagsanjan Laguna\" on Waze or Google Maps."}
    ],
    "footer_note": "Full guidelines — ask the Estelita Assistant (chat below)."
  }'::jsonb
)
on conflict (key) do nothing;

insert into public.gallery_images (public_url, alt, sort_order)
select v.public_url, v.alt, v.sort_order
from (values
  ('/assets/gallery/pool-dual.webp', 'Swimming pool and jacuzzi courtyard', 1),
  ('/assets/gallery/pool-fountain.webp', 'Pool with fountain and lounge area', 2),
  ('/assets/gallery/pool-lounge.webp', 'Shaded poolside lounge and bar', 3),
  ('/assets/gallery/aerial-courtyard.webp', 'Aerial view of the resort courtyard', 4),
  ('/assets/gallery/terrace-pavilion.webp', 'Rooftop terrace pavilion', 5),
  ('/assets/gallery/gazebo-interior.webp', 'Wooden gazebo lounge', 6),
  ('/assets/gallery/dining-lounge.webp', 'Indoor dining and lounge area', 7),
  ('/assets/gallery/bar-area.webp', 'Bar area beside the pool', 8),
  ('/assets/gallery/outdoor-kitchen.webp', 'Outdoor kitchen and grill', 9),
  ('/assets/gallery/bathroom.webp', 'Modern marble bathroom', 10),
  ('/assets/gallery/bedroom-purple.webp', 'Guest bedroom with ambient lighting', 11),
  ('/assets/gallery/bedroom-trundle.webp', 'Family room with trundle beds', 12),
  ('/assets/gallery/bedroom-bunk.webp', 'Bunk bed room', 13)
) as v(public_url, alt, sort_order)
where not exists (select 1 from public.gallery_images limit 1);
