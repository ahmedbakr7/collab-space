'use client';

import { Sidebar } from '@/shared/components/layout/sidebar';
import { Header } from '@/shared/components/layout/header';
import { useAuthGuard } from '@/features/auth/presentation/hooks/use-auth-guard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { isLoading, isAuthenticated } = useAuthGuard();

  // if (isLoading) {
  //   return (
  //     <div className="flex h-dvh items-center justify-center bg-background">
  //       <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  //     </div>
  //   );
  // }

  // if (!isAuthenticated) {
  //   return null; // Will redirect in hook
  // }

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
