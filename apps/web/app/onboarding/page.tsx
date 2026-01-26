'use client';

import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { CreateOrgValues } from '@/features/organization/components/create-organization-form';
import { JoinOrgValues } from '@/features/organization/components/join-organization-form';
import { OrganizationModePicker } from '@/features/organization/components/organization-mode-picker';
import { CreateOrganizationFlow } from '@/features/organization/components/create-organization-flow';
import { JoinOrganizationFlow } from '@/features/organization/components/join-organization-flow';
import { Card, CardContent } from '@/shared/components/ui/card';

type Mode = 'choose' | 'create' | 'join';

export default function OrganizationSetupPage() {
  const [mode, setMode] = useState<Mode>('choose');

  const handleCreateOrganization = async (values: CreateOrgValues) => {
    try {
      console.log('Creating organization:', values);
      // TODO: Call API to create organization
      // router.push('/dashboard');
    } catch (error) {
      console.error('Failed to create organization:', error);
    }
  };

  const handleJoinOrganization = async (values: JoinOrgValues) => {
    try {
      console.log('Joining organization:', values);
      // TODO: Call API to join organization
      // router.push('/dashboard');
    } catch (error) {
      console.error('Failed to join organization:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-1 text-3xl font-bold tracking-tight text-foreground">
            {mode === 'choose' && 'Welcome to CollabSpace!'}
            {mode === 'create' && 'Create your organization'}
            {mode === 'join' && 'Join an organization'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {mode === 'choose' &&
              'Get started by creating or joining an organization'}
            {mode === 'create' &&
              'Set up your organization to start collaborating with your team'}
            {mode === 'join' &&
              'Enter your invite code to join an existing organization'}
          </p>
        </div>

        <Card className="border-border rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-4">
            {mode === 'choose' && (
              <OrganizationModePicker onModeSelect={setMode} />
            )}

            {mode === 'create' && (
              <CreateOrganizationFlow
                onBack={() => setMode('choose')}
                onCreateOrganization={handleCreateOrganization}
              />
            )}

            {mode === 'join' && (
              <JoinOrganizationFlow
                onBack={() => setMode('choose')}
                onJoinOrganization={handleJoinOrganization}
              />
            )}
          </CardContent>
        </Card>

        {mode === 'choose' && (
          <div className="mt-1 text-center">
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
