'use client';

import { useRouter } from 'next/navigation';
import { OrganizationModePicker } from '@/features/organization/components/organization-mode-picker';

export default function OrganizationSetupPage() {
  const router = useRouter();

  const handleModeSelect = (mode: 'create' | 'join' | 'existing') => {
    router.push(`/onboarding/${mode}`);
  };

  return <OrganizationModePicker onModeSelect={handleModeSelect} />;
}
