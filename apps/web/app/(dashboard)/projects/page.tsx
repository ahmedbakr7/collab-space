'use client';

import { useState } from 'react';
import { ArrowLeft, Filter, LayoutGrid, List, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { KanbanBoard } from '@/features/project/presentation/components/kanban-board';
import { TaskDetailDrawer } from '@/features/project/presentation/components/task-detail-drawer';
import { Task } from '@/features/project/presentation/components/task-card';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { useRouter } from 'next/navigation';

const mockColumns = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-muted-foreground',
    tasks: [
      {
        id: '1',
        title: 'Design new landing page',
        description:
          'Create mockups for the new product landing page with updated branding',
        assignee: {
          name: 'Emma Wilson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        },
        priority: 'high' as const,
        dueDate: 'Oct 30',
        comments: 3,
        attachments: 2,
        tags: ['Design', 'Marketing'],
      },
      {
        id: '2',
        title: 'Update API documentation',
        description: 'Add documentation for the new authentication endpoints',
        assignee: {
          name: 'Michael Chen',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        },
        priority: 'medium' as const,
        dueDate: 'Nov 2',
        comments: 1,
        attachments: 0,
        tags: ['Documentation'],
      },
      {
        id: '3',
        title: 'Research competitor features',
        assignee: {
          name: 'Lisa Rodriguez',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
        },
        priority: 'low' as const,
        dueDate: 'Nov 5',
        comments: 0,
        attachments: 1,
      },
    ] as Task[],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-chart-1',
    tasks: [
      {
        id: '4',
        title: 'Implement user authentication',
        description: 'Add OAuth 2.0 support and JWT token handling',
        assignee: {
          name: 'David Kim',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        },
        priority: 'urgent' as const,
        dueDate: 'Oct 28',
        comments: 8,
        attachments: 3,
        tags: ['Backend', 'Security'],
      },
      {
        id: '5',
        title: 'Mobile app testing',
        description: 'Test new features on iOS and Android devices',
        assignee: {
          name: 'Sarah Anderson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
        priority: 'high' as const,
        dueDate: 'Oct 29',
        comments: 5,
        attachments: 1,
        tags: ['QA', 'Mobile'],
      },
    ] as Task[],
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-chart-4',
    tasks: [
      {
        id: '6',
        title: 'Code review for payment flow',
        assignee: {
          name: 'Alex Turner',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        },
        priority: 'high' as const,
        dueDate: 'Oct 27',
        comments: 12,
        attachments: 0,
        tags: ['Backend', 'Payments'],
      },
    ] as Task[],
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-chart-2',
    tasks: [
      {
        id: '7',
        title: 'Update user profile UI',
        description: 'Redesigned profile page with new layout and features',
        assignee: {
          name: 'Sophie Martinez',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
        },
        priority: 'medium' as const,
        dueDate: 'Oct 25',
        comments: 6,
        attachments: 4,
        tags: ['Frontend', 'UI'],
      },
      {
        id: '8',
        title: 'Database migration',
        assignee: {
          name: 'Chris Lee',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris',
        },
        priority: 'high' as const,
        dueDate: 'Oct 24',
        comments: 2,
        attachments: 1,
        tags: ['Backend', 'Database'],
      },
    ] as Task[],
  },
];

export default function ProjectsPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<string>('board');
  const router = useRouter();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="mb-1 text-2xl font-semibold">
                Product Roadmap Q4
              </h1>
              <p className="text-sm text-muted-foreground">
                Product Team • 12 members
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Tabs value={viewMode} onValueChange={setViewMode}>
              <TabsList>
                <TabsTrigger value="board">
                  <LayoutGrid className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <List className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New task
            </Button>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-hidden p-6">
        {viewMode === 'board' && (
          <KanbanBoard columns={mockColumns} onTaskClick={setSelectedTask} />
        )}
        {viewMode === 'list' && (
          <div className="text-center p-12 text-muted-foreground">
            List view coming soon (use Tasks page for now)
          </div>
        )}
      </div>

      {/* Task Detail Drawer */}
      {selectedTask && (
        <TaskDetailDrawer
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}
