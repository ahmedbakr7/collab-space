'use client';

import { useState } from 'react';
import { Search, Download, Plus, CheckSquare, Calendar } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { TaskDetailDrawer } from '@/features/project/presentation/components/task-detail-drawer';
import {
  Task,
  TaskPriority,
  TaskStatus,
} from '@repo/domain/src/task/entities/task.entity';
import { Card, CardContent } from '@/shared/components/ui/card';
import { useRouter } from 'next/navigation';
import { useTasks } from '@/features/task/presentation/hooks/use-tasks.hook';

const statusConfig: Record<
  string,
  { label: string; color: string; dotColor: string }
> = {
  [TaskStatus.TODO]: {
    label: 'To Do',
    color: 'bg-muted',
    dotColor: 'bg-muted-foreground',
  },
  [TaskStatus.IN_PROGRESS]: {
    label: 'In Progress',
    color: 'bg-chart-1',
    dotColor: 'bg-chart-1',
  },
  [TaskStatus.REVIEW]: {
    label: 'Review',
    color: 'bg-chart-4',
    dotColor: 'bg-chart-4',
  },
  [TaskStatus.DONE]: {
    label: 'Done',
    color: 'bg-chart-2',
    dotColor: 'bg-chart-2',
  },
};

const priorityConfig: Record<
  string,
  {
    label: string;
    variant: 'default' | 'destructive' | 'secondary' | 'outline';
  }
> = {
  [TaskPriority.URGENT]: { label: 'Urgent', variant: 'destructive' },
  [TaskPriority.HIGH]: { label: 'High', variant: 'default' },
  [TaskPriority.MEDIUM]: { label: 'Medium', variant: 'secondary' },
  [TaskPriority.LOW]: { label: 'Low', variant: 'outline' },
};

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<string>('all');
  const router = useRouter();

  const { tasks, loading } = useTasks();

  if (loading) {
    return <div className="p-8">Loading tasks...</div>;
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Calculate stats
  const stats = {
    total: filteredTasks.length,
    todo: filteredTasks.filter((t) => t.status === TaskStatus.TODO).length,
    inProgress: filteredTasks.filter((t) => t.status === TaskStatus.IN_PROGRESS)
      .length,
    review: filteredTasks.filter((t) => t.status === TaskStatus.REVIEW).length,
    done: filteredTasks.filter((t) => t.status === TaskStatus.DONE).length,
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
        {/* Simplified stats rendering for brevity, can add more */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">In Progress</span>
              <div className="w-2 h-2 rounded-full bg-blue-500" />
            </div>
            <p className="text-2xl font-semibold">{stats.inProgress}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* View Mode Toggle */}
            <Tabs value={viewMode} onValueChange={setViewMode}>
              <TabsList>
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Workspace</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>Due Date</span>
                </div>
              </TableHead>
              <TableHead className="text-right">Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12">
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <TableRow
                  key={task.id}
                  className="cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => setSelectedTask(task)}
                >
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{task.title}</p>
                      {task.tags && task.tags.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap">
                          {task.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${statusConfig[task.status].dotColor}`}
                      />
                      <span className="text-sm">
                        {statusConfig[task.status].label}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={priorityConfig[task.priority].variant}
                      className="text-xs"
                    >
                      {priorityConfig[task.priority].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm truncate max-w-[120px]">
                        {task.assignee.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {task.workspace}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {task.dueDate.toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-3 text-xs text-muted-foreground">
                      {task.comments > 0 && (
                        <span className="flex items-center">
                          💬 {task.comments}
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

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
