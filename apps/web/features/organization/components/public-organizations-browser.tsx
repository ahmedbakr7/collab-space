'use client';

import { useState } from 'react';
import {
  Search,
  Globe,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { cn } from '@/shared/lib/utils'; // Assuming this exists, standard in shadcn

interface PublicOrganization {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  memberCount: number;
  category: string;
  isPublic: boolean;
  verified?: boolean;
}

interface PublicOrganizationsBrowserProps {
  onJoinOrganization: (organizationId: string) => void;
}

// Mock Data
const MOCK_PUBLIC_ORGANIZATIONS: PublicOrganization[] = [
  {
    id: 'org-1',
    name: 'Acme Corp',
    description: 'Building the future of nothing in particular.',
    memberCount: 120,
    category: 'tech',
    isPublic: true,
    verified: true,
  },
  {
    id: 'org-2',
    name: 'Open Source Collective',
    description: 'A community of open source maintainers and contributors.',
    memberCount: 5430,
    category: 'community',
    isPublic: true,
    verified: true,
  },
  {
    id: 'org-3',
    name: 'Designers Unite',
    description: 'Sharing design resources and feedback.',
    memberCount: 89,
    category: 'design',
    isPublic: true,
  },
  {
    id: 'org-4',
    name: 'Gaming Hub',
    description: 'For all things gaming. Tournaments, reviews, and more.',
    memberCount: 1200,
    category: 'gaming',
    isPublic: true,
  },
  {
    id: 'org-5',
    name: 'Writers Block',
    description: 'A place for writers to procrastinate together.',
    memberCount: 42,
    category: 'community',
    isPublic: true,
  },
];

export function PublicOrganizationsBrowser({
  onJoinOrganization,
}: PublicOrganizationsBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories
  const categories = [
    'all',
    ...Array.from(
      new Set(
        MOCK_PUBLIC_ORGANIZATIONS.map((org) => org.category).filter(
          (cat): cat is string => cat !== undefined,
        ),
      ),
    ),
  ];

  // Filter organizations based on search and category
  const filteredOrganizations = MOCK_PUBLIC_ORGANIZATIONS.filter((org) => {
    const matchesSearch =
      searchQuery === '' ||
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || org.category === selectedCategory;

    return matchesSearch && matchesCategory && org.isPublic;
  });

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

      {/* Category filters */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground',
              )}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredOrganizations.length}{' '}
        {filteredOrganizations.length === 1 ? 'organization' : 'organizations'}{' '}
        found
      </div>

      {/* Organizations list */}
      <ScrollArea className="max-h-[450px] pr-4">
        {filteredOrganizations.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
              <Globe className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No organizations found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
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
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1 min-w-0 flex items-center gap-2">
                        <h3 className="font-semibold truncate">{org.name}</h3>
                        {org.verified && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        )}
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
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{org.memberCount} members</span>
                        </div>
                        {org.category && (
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                            {org.category}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => onJoinOrganization(org.id)}
                        className="gap-2"
                      >
                        Join
                        <ArrowRight className="h-4 w-4" />
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
