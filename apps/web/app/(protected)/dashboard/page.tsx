import { redirect } from 'next/navigation';
import { serverContainer } from '@/shared/layers/di/server.container';
import { GetAllWorkspacesUseCase } from '@/features/workspace/application/use-cases/get-all-workspaces.usecase';
import { ROUTES } from '@/shared/config/routes';

export default async function DashboardRootPage() {
  const getAllWorkspacesUseCase = serverContainer.resolve(
    GetAllWorkspacesUseCase,
  );

  // TODO: Replace hardcoded user ID with actual authenticated user ID
  const workspaces = await getAllWorkspacesUseCase.execute(
    'a8bbbe9b-fa1d-42a6-a66b-a4b9381f5ee1',
  );

  if (workspaces.length > 0) {
    redirect(ROUTES.DASHBOARD.HOME(workspaces[0]!.id));
  } else {
    redirect(ROUTES.ONBOARDING);
  }
}
