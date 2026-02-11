-- ============================================
-- pickleballshannon.com - Supabase Setup
-- Run this in the Supabase SQL Editor once the project is active.
-- ============================================

-- Create inquiries table for contact form submissions
CREATE TABLE IF NOT EXISTS public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service_interest text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT only (for the contact form)
CREATE POLICY "Allow anonymous inserts" ON public.inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- No SELECT, UPDATE, or DELETE policies for anon
-- Data is only readable via the Supabase dashboard or service role key
