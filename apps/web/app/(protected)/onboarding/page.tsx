'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { OrganizationModePicker } from '@/features/organization/components/organization-mode-picker';

export default function OrganizationSetupPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleModeSelect = (mode: 'create' | 'join' | 'existing') => {
    startTransition(() => {
      router.push(`/onboarding/${mode}`);
    });
  };

  return <OrganizationModePicker onModeSelect={handleModeSelect} isPending={isPending} />;
}
