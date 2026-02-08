import { Sidebar } from '@/shared/components/layout/sidebar';
import { Header } from '@/shared/components/layout/header';
import { createClient } from '@repo/supabase/server';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';
import { serverContainer } from '@/shared/layers/di/server.container';
import { GetAllWorkspacesUseCase } from '@/features/workspace/application/use-cases/get-all-workspaces.usecase';
import { Suspense } from 'react';
import { Skeleton } from '@/shared/components/ui/skeleton';

async function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const session = await supabase.auth.getSession();

  const { data } = await supabase.auth.getClaims();
  console.log(session);

  if (!data?.claims) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const getAllWorkspacesUseCase = serverContainer.resolve(
    GetAllWorkspacesUseCase,
  );

  const workspacesPromise = getAllWorkspacesUseCase
    .execute('a8bbbe9b-fa1d-42a6-a66b-a4b9381f5ee1')
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}
