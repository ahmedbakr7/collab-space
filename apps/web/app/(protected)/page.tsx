import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';

export default async function RootPage() {
  redirect(ROUTES.DASHBOARD.ROOT);
}
