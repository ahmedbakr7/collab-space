'use client';

import { useRouter } from 'next/navigation';
import { CreateOrganizationFlow } from '@/features/organization/components/create-organization-flow';

export default function CreateOrganizationPage() {
  const router = useRouter();

  return <CreateOrganizationFlow onBack={() => router.push('/onboarding')} />;
}
