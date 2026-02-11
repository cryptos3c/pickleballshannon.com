import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/** Supabase client - uses placeholder values at build time if env vars are not set */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

/** TypeScript type for the inquiries table */
export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  service_interest: string;
  message: string;
  created_at?: string;
}
