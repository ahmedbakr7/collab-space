'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { useState, use, useMemo } from 'react';
import { Download, Plus, CheckSquare } from 'lucide-react';
import { Button, buttonVariants } from '@/shared/components/ui/button';
import { ROUTES } from '@/shared/config/routes';
import Link from 'next/link';
import { TaskDetailDrawer } from '@/features/project/presentation/components/task-detail-drawer';
import { Task, TaskStatus } from '@repo/domain/src/task/entities/task.entity';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useTasks } from '@/features/task/presentation/hooks/use-tasks.hook';
import { DataTableSkeleton } from '@/shared/components/data-table/data-table-skeleton';
import TableComponent from './table-component';
import {
  useQueryState,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
} from 'nuqs';
import { getSortingStateParser } from '@/shared/lib/parsers';
import type { QueryOptions, FilterOption } from '@repo/domain';

interface TasksPageProps {
  params: Promise<{ dashboardId: string }>;
}

function TasksPageContent({ dashboardId }: { dashboardId: string }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Read URL state via nuqs
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [sort] = useQueryState('sort', getSortingStateParser<Task>());

  // Read standard filter columns individually
  const [title] = useQueryState('title', parseAsString.withDefault(''));
  const [status] = useQueryState(
    'status',
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [priority] = useQueryState(
    'priority',
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  // Build domain QueryOptions
  const queryOptions = useMemo<QueryOptions>(() => {
    const activeFilters: FilterOption[] = [];
    if (title)
      activeFilters.push({ field: 'title', value: title, operator: 'eq' });
    if (status && status.length > 0)
      activeFilters.push({ field: 'status', value: status, operator: 'in' });
    if (priority && priority.length > 0)
      activeFilters.push({
        field: 'priority',
        value: priority,
        operator: 'in',
      });

    return {
      pagination: {
        page,
        limit: perPage,
      },
      sort: sort?.map((s) => ({
        field: s.id,
        direction: s.desc ? 'desc' : 'asc',
      })),
      filters: activeFilters.length > 0 ? activeFilters : undefined,
    };
  }, [page, perPage, sort, title, status, priority]);

  const { tasks, meta, loading } = useTasks(dashboardId, queryOptions);

  // Calculate local stats based on the returned data and meta
  const stats = {
    total: meta?.total ?? tasks.length,
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
          <div className="text-muted-foreground">
            {loading ? (
              <Skeleton className="h-4 w-48" />
            ) : (
              <>
                {stats.total} {stats.total === 1 ? 'task' : 'tasks'} found
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link
            href={ROUTES.DASHBOARD.TASKS.CREATE(dashboardId)}
            className={buttonVariants()}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Link>
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
            {loading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <p className="text-2xl font-semibold">{stats.total}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">To Do</span>
              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
            </div>
            {loading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <p className="text-2xl font-semibold">{stats.todo}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">In Progress</span>
              <div className="w-2 h-2 rounded-full bg-chart-1" />
            </div>
            {loading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <p className="text-2xl font-semibold">{stats.inProgress}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Review</span>
              <div className="w-2 h-2 rounded-full bg-chart-4" />
            </div>
            {loading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <p className="text-2xl font-semibold">{stats.review}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Done</span>
              <div className="w-2 h-2 rounded-full bg-chart-2" />
            </div>
            {loading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <p className="text-2xl font-semibold">{stats.done}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tasks Table */}
      {loading ? (
        <DataTableSkeleton
          columnCount={6}
          rowCount={10}
          filterCount={3}
          withPagination
          withViewOptions
        />
      ) : (
        <TableComponent
          filteredTasks={tasks}
          pageCount={meta?.totalPages ?? -1}
          setSelectedTask={setSelectedTask}
        />
      )}

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

export default function TasksPage({ params }: TasksPageProps) {
  const { dashboardId } = use(params);

  return (
    <NuqsAdapter>
      <TasksPageContent dashboardId={dashboardId} />
    </NuqsAdapter>
  );
}
