'use client';

import { Building2, UserPlus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface OrganizationModePickerProps {
  onModeSelect: (mode: 'create' | 'join' | 'existing') => void;
}

export function OrganizationModePicker({
  onModeSelect,
}: OrganizationModePickerProps) {
  return (
    <div className="grid gap-2 animate-in fade-in duration-300">
      <Button
        variant="outline"
        onClick={() => onModeSelect('create')}
        className="group h-auto w-full justify-start items-start relative overflow-hidden rounded-xl border-2 hover:border-primary p-4 bg-background hover:bg-muted/50"
      >
        <div className="flex items-start gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1 text-foreground whitespace-normal text-left">
              Create a new organization
            </h3>
            <p className="text-sm text-muted-foreground whitespace-normal text-left font-normal">
              Start fresh with your own organization. Perfect for new teams and
              projects.
            </p>
          </div>
        </div>
      </Button>

      <Button
        variant="outline"
        onClick={() => onModeSelect('join')}
        className="group h-auto w-full justify-start items-start relative overflow-hidden rounded-xl border-2 hover:border-primary p-4 bg-background hover:bg-muted/50"
      >
        <div className="flex items-start gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1 text-foreground whitespace-normal text-left">
              Join an existing organization
            </h3>
            <p className="text-sm text-muted-foreground whitespace-normal text-left font-normal">
              Have an invite code? Join your team&apos;s organization to start
              collaborating.
            </p>
          </div>
        </div>
      </Button>

      <Button
        variant="outline"
        onClick={() => onModeSelect('existing')}
        className="group h-auto w-full justify-start items-start relative overflow-hidden rounded-xl border-2 hover:border-primary p-4 bg-background hover:bg-muted/50"
      >
        <div className="flex items-start gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1 text-foreground whitespace-normal text-left">
              Open existing organization
            </h3>
            <p className="text-sm text-muted-foreground whitespace-normal text-left font-normal">
              Already have an organization? Go directly to your dashboard.
            </p>
          </div>
        </div>
      </Button>
    </div>
  );
}
