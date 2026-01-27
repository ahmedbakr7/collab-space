'use client';

import { Building2 } from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { usePathname } from 'next/navigation';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mode = pathname.split('/').pop();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            {mode === 'onboarding' && 'Welcome to CollabSpace!'}
            {mode === 'create' && 'Create your organization'}
            {mode === 'join' && 'Join an organization'}
            {mode === 'existing' && 'Your Organizations'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {mode === 'onboarding' &&
              'Get started by creating or joining an organization'}
            {mode === 'create' &&
              'Set up your organization to start collaborating with your team'}
            {mode === 'join' &&
              'Enter your invite code to join an existing organization'}
            {mode === 'existing' && 'Select an organization to continue'}
          </p>
        </div>

        <Card className="border-border rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-4">{children}</CardContent>
        </Card>

        {mode === 'onboarding' && (
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              You can switch organizations or create additional ones later from
              your settings
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
