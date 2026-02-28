-- Remove overly permissive SELECT policies on form_submissions
-- Only service_role (edge functions) should read this data
DROP POLICY "Only authenticated users can view form submissions" ON public.form_submissions;
DROP POLICY "Admins can view all form submissions" ON public.form_submissions;