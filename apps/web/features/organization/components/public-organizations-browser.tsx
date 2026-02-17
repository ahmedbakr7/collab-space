'use client';

import { useState } from 'react';
import { Search, Globe, Building2, ArrowRight } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { usePublicOrganizations } from '../presentation/hooks/use-public-organizations';

export function PublicOrganizationsBrowser() {
  const { organizations, isLoading, joinOrganization, joiningOrganizationId } =
    usePublicOrganizations();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter organizations based on search
  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      searchQuery === '' ||
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleJoin = async (orgId: string) => {
    await joinOrganization(orgId);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Browse Public Organizations
        </h3>
        <p className="text-sm text-muted-foreground">
          Discover and join public organizations that match your interests
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search organizations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {isLoading ? (
          'Loading...'
        ) : (
          <>
            {filteredOrganizations.length}{' '}
            {filteredOrganizations.length === 1
              ? 'organization'
              : 'organizations'}{' '}
            found
          </>
        )}
      </div>

      {/* Organizations list */}
      <ScrollArea className="max-h-[450px] pr-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredOrganizations.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
              <Globe className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No organizations found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrganizations.map((org) => (
              <div
                key={org.id}
                className="group relative overflow-hidden rounded-xl border border-border hover:border-primary transition-all p-4 bg-background hover:bg-accent/40"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1 min-w-0 flex items-center gap-2">
                        <h3 className="font-semibold truncate">{org.name}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                        <Globe className="h-3 w-3" />
                        <span>Public</span>
                      </div>
                    </div>

                    {org.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {org.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {/* Member count temporarily hidden or 0 as it's not in public list query yet */}
                        {/* <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{org.members.length} members</span>
                        </div> */}
                        <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                          General
                        </span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleJoin(org.id)}
                        disabled={joiningOrganizationId === org.id}
                        className="gap-2"
                      >
                        {joiningOrganizationId === org.id ? (
                          'Joining...'
                        ) : (
                          <>
                            Join
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
