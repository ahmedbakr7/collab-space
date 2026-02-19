import { useState } from 'react';
import { ProjectUI } from '../models/project-ui.model';
import { ProjectsList } from './projects-list';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Search, Grid3x3, List, FolderKanban } from 'lucide-react';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import { ProjectStatus } from '@repo/domain/src/project/entities/project.entity';

interface ProjectsViewProps {
  projects: ProjectUI[];
  loading: boolean;
  workspaces: Workspace[];
  selectedWorkspaceId: string;
  onWorkspaceChange: (id: string) => void;
  onNavigate: (path: string) => void;
}

const PROJECT_STATUSES: ProjectStatus[] = [
  'active',
  'planning',
  'review',
  'completed',
];

export function ProjectsView({
  projects,
  loading,
  workspaces,
  selectedWorkspaceId,
  onWorkspaceChange,
  onNavigate,
}: ProjectsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter Logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === 'all' || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">All Projects</h1>
        <p className="text-muted-foreground">
          Manage and track all projects across your workspaces
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={selectedWorkspaceId}
          onValueChange={(value) => value && onWorkspaceChange(value)}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select Workspace" />
          </SelectTrigger>
          <SelectContent>
            {workspaces.map((ws) => (
              <SelectItem key={ws.id} value={ws.id}>
                {ws.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedStatus}
          onValueChange={(value) => value && setSelectedStatus(value)}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {PROJECT_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Tabs
          value={viewMode}
          onValueChange={(v) => setViewMode(v as 'grid' | 'list')}
        >
          <TabsList>
            <TabsTrigger value="grid">
              <Grid3x3 className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-semibold">
                  {filteredProjects.length}
                </p>
              </div>
              <FolderKanban className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-semibold">
                  {filteredProjects.filter((p) => p.status === 'active').length}
                </p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Planning</p>
                <p className="text-2xl font-semibold">
                  {
                    filteredProjects.filter((p) => p.status === 'planning')
                      .length
                  }
                </p>
              </div>
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-semibold">
                  {
                    filteredProjects.filter((p) => p.status === 'completed')
                      .length
                  }
                </p>
              </div>
              <div className="w-3 h-3 rounded-full bg-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid/List */}
      <ProjectsList
        projects={filteredProjects}
        viewMode={viewMode}
        onNavigate={onNavigate}
      />

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderKanban className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or create a new project
          </p>
        </div>
      )}
    </div>
  );
}
