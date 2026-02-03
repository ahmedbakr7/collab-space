import { createClient } from '@supabase/supabase-js';
import { Database } from './types';
import { extendSupabaseAuth } from './auth-extension';

extendSupabaseAuth();

export function createServiceClient(url: string, key: string) {
  return createClient<Database>(url, key);
}
