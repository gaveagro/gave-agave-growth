-- Harden RLS for form_submissions without breaking form submissions
-- 1) Ensure RLS is enabled
alter table public.form_submissions enable row level security;

-- 2) Drop any overly-permissive existing policies
drop policy if exists "Service role can manage form submissions" on public.form_submissions;
drop policy if exists "Allow public read" on public.form_submissions;
drop policy if exists "Enable all access" on public.form_submissions;

-- 3) Allow inserts from the public (anon) and authenticated roles to avoid breaking any direct client flows
create policy "Anyone can insert form submissions"
  on public.form_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Note: We intentionally do NOT create SELECT/UPDATE/DELETE policies.
-- Without policies, those operations are denied for anon/authenticated.
-- The service role still bypasses RLS and can read/update/delete for notifications and admin use cases.