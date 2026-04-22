-- Defense-in-depth: explicitly deny SELECT/UPDATE/DELETE on form_submissions for anon and authenticated.
-- Service role bypasses RLS, so backend (edge functions) still has full access.

-- Drop any prior explicit deny policies if they exist (safe re-run)
DROP POLICY IF EXISTS "Deny select to anon and authenticated" ON public.form_submissions;
DROP POLICY IF EXISTS "Deny update to anon and authenticated" ON public.form_submissions;
DROP POLICY IF EXISTS "Deny delete to anon and authenticated" ON public.form_submissions;

-- Explicit restrictive denies (false → never matches)
CREATE POLICY "Deny select to anon and authenticated"
ON public.form_submissions
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "Deny update to anon and authenticated"
ON public.form_submissions
AS RESTRICTIVE
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny delete to anon and authenticated"
ON public.form_submissions
AS RESTRICTIVE
FOR DELETE
TO anon, authenticated
USING (false);