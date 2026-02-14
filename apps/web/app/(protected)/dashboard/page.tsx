import { redirect } from 'next/navigation';
import { serverContainer } from '@/shared/layers/di/server.container';
import { GetOrganizationsUseCase } from '@/features/organization/application/use-cases/get-organizations.use-case';
import { ROUTES } from '@/shared/config/routes';

export default async function DashboardRootPage() {
  const getOrganizationsUseCase = serverContainer.resolve(
    GetOrganizationsUseCase,
  );

  const organizations = await getOrganizationsUseCase.execute();

  if (organizations.length > 0) {
    redirect(ROUTES.DASHBOARD.HOME(organizations[0]!.id));
  } else {
    redirect(ROUTES.ONBOARDING);
  }
}
