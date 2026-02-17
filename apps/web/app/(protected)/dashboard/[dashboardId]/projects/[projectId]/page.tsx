'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Filter, LayoutGrid, List, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { KanbanBoard } from '@/features/project/presentation/components/kanban-board';
import { TaskDetailDrawer } from '@/features/project/presentation/components/task-detail-drawer';
import { Task } from '@repo/domain/src/task/entities/task.entity';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { useProjectTasks } from '@/features/project/presentation/hooks/use-project-tasks.hook';
import { Skeleton } from '@/shared/components/ui/skeleton';

export default function ProjectDetailPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<string>('board');
  const router = useRouter();
  const params = useParams<{ dashboardId: string; projectId: string }>();
  const { projectId, dashboardId } = params;

  const { columns, loading } = useProjectTasks(projectId);

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-9 h-9 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="flex space-x-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-80 h-96 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Calculate total tasks from columns
  const totalTasks = columns.reduce((sum, col) => sum + col.tasks.length, 0);

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
              <h1 className="mb-1 text-2xl font-semibold">Project Board</h1>
              <p className="text-sm text-muted-foreground">
                {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
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
          <KanbanBoard columns={columns} onTaskClick={setSelectedTask} />
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
