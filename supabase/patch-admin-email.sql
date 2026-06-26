-- Run this in Supabase SQL Editor if you already applied an older schema.sql
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
