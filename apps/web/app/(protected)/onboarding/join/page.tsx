'use client';

import { useRouter } from 'next/navigation';
import { JoinOrganizationFlow } from '@/features/organization/components/join-organization-flow';

export default function JoinOrganizationPage() {
  const router = useRouter();

  return <JoinOrganizationFlow onBack={() => router.push('/onboarding')} />;
}
