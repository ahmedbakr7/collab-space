import { ROUTES } from '@/shared/config/routes';
import { createClient } from '@repo/supabase/server';
import { redirect } from 'next/navigation';
import { Suspense, PropsWithChildren } from 'react';

async function AuthCheck({ children }: PropsWithChildren) {
  const supabase = await createClient();
  const session = await supabase.auth.getSession();
  const { data } = await supabase.auth.getClaims();
  console.log(session);

  if (!data?.claims) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  return <>{children}</>;
}

export default function protectedLayout({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={null}>
      <AuthCheck>{children}</AuthCheck>
    </Suspense>
  );
}
