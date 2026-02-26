import { redirect } from 'next/navigation';
import { serverContainer } from '@/shared/layers/di/server.container';
import { GetOrganizationsUseCase } from '@/features/organization/application/use-cases/get-organizations.use-case';
import { ROUTES } from '@/shared/config/routes';

export default async function DashboardRootPage() {
  const getOrganizationsUseCase = serverContainer.resolve(
    GetOrganizationsUseCase,
  );

  const result = await getOrganizationsUseCase.execute();

  if (result.data.length > 0) {
    redirect(ROUTES.DASHBOARD.HOME(result.data[0]!.id));
  } else {
    redirect(ROUTES.ONBOARDING.ROOT);
  }
}
