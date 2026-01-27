'use client';

import { useRouter } from 'next/navigation';
import { ExistingOrganizationsList } from '@/features/organization/components/existing-organizations-list';

export default function ExistingOrganizationsPage() {
  const router = useRouter();

  return (
    <ExistingOrganizationsList onBack={() => router.push('/onboarding')} />
  );
}
