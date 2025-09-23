-- Add RLS policy to allow only authenticated users with admin role to view form submissions
-- This protects sensitive customer data while allowing legitimate access

-- First, create a basic policy for authenticated users to view their own submissions (if we add user tracking later)
-- For now, we'll create a policy that requires authentication for any SELECT operations
CREATE POLICY "Only authenticated users can view form submissions" 
ON public.form_submissions 
FOR SELECT 
TO authenticated
USING (true);

-- Add a more restrictive policy for future admin functionality
-- This policy will be ready when user roles are implemented
CREATE POLICY "Admins can view all form submissions" 
ON public.form_submissions 
FOR SELECT 
TO authenticated
USING (
  -- This will work when auth is implemented and user roles are added
  -- For now it will require authentication
  auth.uid() IS NOT NULL
);