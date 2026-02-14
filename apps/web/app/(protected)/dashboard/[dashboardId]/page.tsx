import Dashboard from '@/features/dashboard/presentation/pages/Dashboard';

interface PageProps {
  params: Promise<{
    dashboardId: string;
  }>;
}

export default async function DashboardPage(props: PageProps) {
  const params = await props.params;
  return <Dashboard dashboardId={params.dashboardId} />;
}
