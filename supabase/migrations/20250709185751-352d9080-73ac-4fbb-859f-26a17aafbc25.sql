
-- Create a table for form submissions
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  investment_amount TEXT,
  investment_model TEXT,
  message TEXT,
  form_type TEXT NOT NULL DEFAULT 'investment-lead-capture',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) but allow service role to access everything
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy that allows service role to manage all records
CREATE POLICY "Service role can manage form submissions" 
  ON public.form_submissions 
  FOR ALL 
  USING (true);
