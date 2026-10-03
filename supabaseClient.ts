/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Access environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
    || import.meta.env.VITE_SUPABASE_ANON_KEY
    || '';

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Publishable Key. Please check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
