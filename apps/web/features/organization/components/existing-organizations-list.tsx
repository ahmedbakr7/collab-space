'use client';

import { ArrowRight, Building2, ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
// import { ROUTES } from '@/shared/config/routes'; // Assuming this exists or using simple strings for now

interface Organization {
  id: string;
  name: string;
  role: string;
  logo?: string;
}

interface ExistingOrganizationsListProps {
  onBack: () => void;
}

// Mock Data
const MOCK_USER_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-1',
    name: 'Acme Corp',
    role: 'Admin',
  },
  {
    id: 'org-2',
    name: 'My Side Project',
    role: 'Owner',
  },
  {
    id: 'org-3',
    name: 'Community Group',
    role: 'Member',
  },
];

export function ExistingOrganizationsList({
  onBack,
}: ExistingOrganizationsListProps) {
  // In a real app, we would use a router here to navigate to the specific org dashboard
  // const router = useRouter();

  const handleOrgClick = (orgId: string) => {
    console.log(`Navigating to organization: ${orgId}`);
    // router.push(ROUTES.DASHBOARD(orgId));
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <ScrollArea className="max-h-[400px] pr-4">
        {MOCK_USER_ORGANIZATIONS.length === 0 ? (
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
            {MOCK_USER_ORGANIZATIONS.map((org) => (
              <button
                key={org.id}
                onClick={() => handleOrgClick(org.id)}
                className="w-full group relative overflow-hidden rounded-xl border border-border hover:border-primary transition-all p-4 bg-background hover:bg-accent/40 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    {org.logo ? (
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <Building2 className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold truncate">{org.name}</h3>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {org.role}
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
