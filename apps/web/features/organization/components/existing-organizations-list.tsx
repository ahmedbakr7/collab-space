'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Building2, ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { useTransition } from 'react';
import { ROUTES } from '@/shared/config/routes';
import { useOrganizations } from '../presentation/hooks/use-organizations';

interface ExistingOrganizationsListProps {
  onBack: () => void;
}

export function ExistingOrganizationsList({
  onBack,
}: ExistingOrganizationsListProps) {
  const router = useRouter();
  const { organizations, isLoading } = useOrganizations();
  const [isPending, startTransition] = useTransition();

  const handleOrgClick = (orgId: string) => {
    startTransition(() => {
      router.push(ROUTES.DASHBOARD.HOME(orgId));
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <ScrollArea className="max-h-[400px] pr-4">
        {organizations.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No organizations found</h3>
            <p className="text-sm text-muted-foreground">
              You are not a member of any organization yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => handleOrgClick(org.id)}
                disabled={isPending}
                className="w-full group relative overflow-hidden rounded-xl border border-border hover:border-primary transition-all p-4 bg-background hover:bg-accent/40 text-left disabled:opacity-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold truncate">{org.name}</h3>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        Member
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
