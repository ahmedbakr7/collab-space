import { Sidebar } from '@/shared/components/layout/sidebar';
import { Header } from '@/shared/components/layout/header';
import { createClient } from '@repo/supabase/server';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';
import { serverContainer } from '@/shared/layers/di/server.container';
import { GetAllWorkspacesUseCase } from '@/features/workspace/application/use-cases/get-all-workspaces.usecase';
import { Suspense } from 'react';
import { Skeleton } from '@/shared/components/ui/skeleton';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getAllWorkspacesUseCase = serverContainer.resolve(
    GetAllWorkspacesUseCase,
  );
  // TODO: Get actual orgId from context/auth
  const workspacesPromise = getAllWorkspacesUseCase
    .execute('f2b55893-288b-4468-972f-a5175cc312ef')
    .then((workspaces) =>
      workspaces.map((w) => ({
        id: w.id,
        orgId: w.orgId,
        name: w.name,
        description: w.description,
        createdAt: w.createdAt,
        updatedAt: w.updatedAt,
      })),
    )
    .catch((err) => {
      console.error('Failed to fetch workspaces:', err);
      // Return empty array to avoid crashing the client if fetch fails
      return [];
    });

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Suspense
        fallback={<Skeleton className="w-64 h-full rounded-none border-r" />}
      >
        <Sidebar workspacesPromise={workspacesPromise} />
      </Suspense>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
