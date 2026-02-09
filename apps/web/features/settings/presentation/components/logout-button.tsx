'use client';

import { useLogout } from '@/features/auth/presentation/hooks/use-logout';
import { Button } from '@/shared/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const { logout } = useLogout();

  return (
    <Button onClick={logout} variant="outline" className="gap-2">
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
