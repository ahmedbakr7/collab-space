'use client';

import { useState } from 'react';
import { ArrowLeft, Filter, LayoutGrid, List, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { KanbanBoard } from '@/features/project/presentation/components/kanban-board';
import { TaskDetailDrawer } from '@/features/project/presentation/components/task-detail-drawer';
import { Task } from '@repo/domain/src/task/entities/task.entity';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { useProjectTasks } from '@/features/project/presentation/hooks/use-project-tasks.hook';

export default function ProjectsPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<string>('board');
  const router = useRouter();

  // Use hook with a hardcoded project ID for now, as per original static data context
  const { columns, loading } = useProjectTasks('project-1');

  if (loading) {
    return <div className="p-8">Loading project board...</div>;
  }

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
