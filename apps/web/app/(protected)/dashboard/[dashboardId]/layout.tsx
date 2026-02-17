import { Sidebar } from '@/shared/components/layout/sidebar';
import { Header } from '@/shared/components/layout/header';
import { serverContainer } from '@/shared/layers/di/server.container';
import { GetAllWorkspacesUseCase } from '@/features/workspace/application/use-cases/get-all-workspaces.usecase';
import { PropsWithChildren, Suspense } from 'react';

interface DashboardLayoutProps extends PropsWithChildren {
  params: Promise<{ dashboardId: string }>;
}

async function DashboardLayoutContent({
  children,
  params,
}: DashboardLayoutProps) {
  const { dashboardId } = await params;

  const getAllWorkspacesUseCase = serverContainer.resolve(
    GetAllWorkspacesUseCase,
  );

  const workspacesPromise = getAllWorkspacesUseCase
    .execute(dashboardId)
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
      return [];
    });

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Sidebar workspacesPromise={workspacesPromise} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  return (
    <Suspense fallback={null}>
      <DashboardLayoutContent params={params}>
        {children}
      </DashboardLayoutContent>
    </Suspense>
  );
}
