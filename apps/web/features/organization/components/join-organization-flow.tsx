'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { JoinOrganizationForm } from './join-organization-form';
import { PublicOrganizationsBrowser } from './public-organizations-browser';

interface JoinOrganizationFlowProps {
  onBack: () => void;
}

export function JoinOrganizationFlow({ onBack }: JoinOrganizationFlowProps) {
  const handleJoinPublic = (organizationId: string) => {
    // TODO: Implement actual join logic
    console.log('Joining public organization:', organizationId);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Join with Invite Code</h2>
            <p className="text-sm text-muted-foreground">
              Enter the code shared with you to join an existing organization
            </p>
          </div>
          <JoinOrganizationForm />
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or browse public organizations
          </span>
        </div>
      </div>

      <PublicOrganizationsBrowser onJoinOrganization={handleJoinPublic} />
    </div>
  );
}
