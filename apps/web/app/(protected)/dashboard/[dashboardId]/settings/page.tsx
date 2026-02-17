import Link from 'next/link';
import { Button, buttonVariants } from '@/shared/components/ui/button';
import { ROUTES } from '@/shared/config/routes';
import { LogoutButton } from '@/features/settings/presentation/components/logout-button';

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            nativeButton={false}
            variant="default"
            render={
              <Link href={ROUTES.ONBOARDING.ROOT}>
                Switch Organization
              </Link>
            }
          ></Button>
          <LogoutButton />
        </div>
      </div>

      <div className="mt-8 p-6 border rounded-lg bg-card">
        <p>Settings content coming soon...</p>
      </div>
    </div>
  );
}
