import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

export function createServiceClient(url: string, key: string) {
  return createClient<Database>(url, key);
}
