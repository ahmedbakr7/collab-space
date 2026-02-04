import { createClient } from '@supabase/supabase-js';

// Lazy init to ensure env vars are loaded
export const getSupabaseAdmin = () => {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY!;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Env Check:', {
      url: !!supabaseUrl,
      key: !!supabaseKey,
      availableEnvKeys: Object.keys(process.env).filter((k) =>
        k.includes('SUPABASE'),
      ),
    });
    throw new Error('Missing Supabase Environment Variables (URL or KEY)');
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

export const generateRandomEmail = () => `e2e-test-${Date.now()}@example.com`;

export const cleanupUser = async (email: string) => {
  const supabaseAdmin = getSupabaseAdmin();
  // Best effort cleanup
  const { data: users } = await supabaseAdmin.auth.admin.listUsers();
  // listUsers might be paginated, but for ephemeral test users this should find recent ones
  const user = users.users.find((u) => u.email === email);
  if (user) {
    await supabaseAdmin.auth.admin.deleteUser(user.id);
  }
};

export const createTestUser = async () => {
  const supabaseAdmin = getSupabaseAdmin();
  const email = generateRandomEmail();
  const password = 'TestPassword123!';
  const { data, error } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: 'E2E Test User',
      },
    },
  });

  if (error) throw error;

  return { email, password, user: data.user };
};
