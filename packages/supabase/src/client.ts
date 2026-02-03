import { createBrowserClient } from '@supabase/ssr';
import { extendSupabaseAuth } from './auth-extension';

extendSupabaseAuth();

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
  );
}
