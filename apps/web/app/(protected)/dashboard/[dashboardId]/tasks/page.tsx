'use client';

import { useState } from 'react';
import { Download, Plus, CheckSquare } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { TaskDetailDrawer } from '@/features/project/presentation/components/task-detail-drawer';
import { Task, TaskStatus } from '@repo/domain/src/task/entities/task.entity';
import { Card, CardContent } from '@/shared/components/ui/card';
import { useRouter } from 'next/navigation';
import { useTasks } from '@/features/task/presentation/hooks/use-tasks.hook';
import TableComponent from './table-component';

export default function TasksPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const router = useRouter();

  const { tasks, loading } = useTasks();

  if (loading) {
    return <div className="p-8">Loading tasks...</div>;
  }

  // Calculate stats
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === TaskStatus.TODO).length,
    inProgress: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
    review: tasks.filter((t) => t.status === TaskStatus.REVIEW).length,
    done: tasks.filter((t) => t.status === TaskStatus.DONE).length,
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-semibold">All Tasks</h1>
          <p className="text-muted-foreground">
            {stats.total} {stats.total === 1 ? 'task' : 'tasks'} across all
            workspaces
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => router.push('/projects')}>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total</span>
              <CheckSquare className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">To Do</span>
              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{stats.todo}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">In Progress</span>
              <div className="w-2 h-2 rounded-full bg-chart-1" />
            </div>
            <p className="text-2xl font-semibold">{stats.inProgress}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Review</span>
              <div className="w-2 h-2 rounded-full bg-chart-4" />
            </div>
            <p className="text-2xl font-semibold">{stats.review}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Done</span>
              <div className="w-2 h-2 rounded-full bg-chart-2" />
            </div>
            <p className="text-2xl font-semibold">{stats.done}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Table */}
      <TableComponent filteredTasks={tasks} setSelectedTask={setSelectedTask} />

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
