'use client';

import { ArrowLeft, Plus, FolderKanban, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { Progress } from '@/shared/components/ui/progress';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { MemberList } from '@/features/workspace/presentation/components/member-list';
import { InviteMember } from '@/features/workspace/presentation/components/invite-member';
import { useRouter } from 'next/navigation';

const mockMembers = [
  {
    id: '1',
    name: 'Sarah Anderson',
    email: 'sarah@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'owner' as const,
    joinedDate: 'Jan 2024',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    role: 'admin' as const,
    joinedDate: 'Feb 2024',
  },
];

const mockProjects = [
  {
    id: '1',
    name: 'Product Roadmap Q4',
    description: 'Q4 2024 feature planning and development roadmap',
    status: 'active' as const,
    progress: 68,
    totalTasks: 95,
    completedTasks: 65,
    dueDate: 'Dec 31, 2024',
    members: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    ],
  },
];

const statusConfig: any = {
  active: { label: 'Active', variant: 'default' },
  planning: { label: 'Planning', variant: 'secondary' },
  review: { label: 'Review', variant: 'default' },
  completed: { label: 'Completed', variant: 'outline' },
};

export default function WorkspaceDetailPage() {
  const router = useRouter();
  const totalTasks = mockProjects.reduce((sum, p) => sum + p.totalTasks, 0);
  const completedTasks = mockProjects.reduce(
    (sum, p) => sum + p.completedTasks,
    0,
  );
  const overallProgress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
              <FolderKanban className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="mb-0 text-xl font-bold">Product Team</h1>
              <p className="text-sm text-muted-foreground">
                {mockMembers.length} members · {mockProjects.length} projects
              </p>
            </div>
          </div>
        </div>
        <Button onClick={() => router.push('/projects/new')}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-muted-foreground mb-1">
              <FolderKanban className="w-4 h-4" />
              <span className="text-sm">Total Projects</span>
            </div>
            <p className="text-2xl font-semibold">{mockProjects.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-muted-foreground mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Overall Progress</span>
            </div>
            <p className="text-2xl font-semibold">{overallProgress}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">Team Members</span>
            </div>
            <p className="text-2xl font-semibold">{mockMembers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">
              Tasks Completed
            </div>
            <p className="text-2xl font-semibold">
              {completedTasks}/{totalTasks}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="invite">Invite</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => router.push('/projects')}
              >
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="mb-2 font-medium group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Status and Due Date */}
                  <div className="flex items-center justify-between">
                    <Badge variant={statusConfig[project.status].variant}>
                      {statusConfig[project.status].label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.dueDate}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Tasks</span>
                      <span>
                        {project.completedTasks} / {project.totalTasks}
                      </span>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="pt-2 border-t border-border">
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 4).map((avatar, idx) => (
                        <Avatar
                          key={idx}
                          className="w-8 h-8 border-2 border-card"
                        >
                          <AvatarImage src={avatar} />
                          <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1 font-medium">Team Members</h3>
              <p className="text-sm text-muted-foreground">
                {mockMembers.length} members in this workspace
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Invite member
            </Button>
          </div>
          <MemberList members={mockMembers} />
        </TabsContent>

        <TabsContent value="invite" className="mt-6">
          <InviteMember />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-medium">Workspace Settings</h3>
              <p className="text-muted-foreground">
                Workspace settings will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
