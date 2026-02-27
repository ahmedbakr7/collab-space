'use client';

import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/shared/components/ui/badge';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/shared/components/ui/avatar';
import {
  Calendar,
  MessageSquare,
  Text,
  AlertTriangle,
  CircleDot,
} from 'lucide-react';
import {
  Task,
  TaskStatus,
  TaskPriority,
} from '@repo/domain/src/task/entities/task.entity';
import { DataTable } from '@/shared/components/data-table/data-table';
import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header';
import { DataTableToolbar } from '@/shared/components/data-table/data-table-toolbar';
import { DataTableSortList } from '@/shared/components/data-table/data-table-sort-list';
import { useDataTable } from '@/shared/hooks/use-data-table';

// ── Status & Priority configs (exported for use in page.tsx stats) ──

export const statusConfig: Record<
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

export const priorityConfig: Record<
  string,
  {
    label: string;
    variant: 'default' | 'destructive' | 'secondary' | 'outline';
  }
> = {
  [TaskPriority.HIGH]: { label: 'High', variant: 'destructive' },
  [TaskPriority.MEDIUM]: { label: 'Medium', variant: 'default' },
  [TaskPriority.LOW]: { label: 'Low', variant: 'outline' },
};

// ── Column definitions ──

function getColumns(onRowClick: (task: Task) => void): ColumnDef<Task>[] {
  return [
    {
      id: 'title',
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Task" />
      ),
      cell: ({ row }) => {
        const task = row.original;
        return (
          <button
            type="button"
            className="w-full text-left space-y-1 cursor-pointer"
            onClick={() => onRowClick(task)}
          >
            <p className="font-medium">{task.title}</p>
            {task.tags && task.tags.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                {task.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline" className="text-xs">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </button>
        );
      },
      meta: {
        label: 'Task',
        placeholder: 'Search tasks...',
        variant: 'text' as const,
        icon: Text,
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterFn: (row, id, value) => {
        const rowValue = row.getValue(id) as string;
        return rowValue
          ? rowValue.toLowerCase().includes(String(value).toLowerCase())
          : false;
      },
    },
    {
      id: 'workspace',
      accessorFn: (row) => row.workspace?.name,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Workspace" />
      ),
      cell: ({ row }) => {
        const workspaceName = row.getValue('workspace') as string;
        return (
          <span className="text-sm truncate max-w-[120px]">
            {workspaceName || 'Unassigned'}
          </span>
        );
      },
      meta: {
        label: 'Workspace',
        placeholder: 'Search workspace...',
        variant: 'text' as const,
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterFn: (row, id, value) => {
        const rowValue = row.getValue(id) as string;
        return rowValue
          ? rowValue.toLowerCase().includes(String(value).toLowerCase())
          : false;
      },
    },
    {
      id: 'project',
      accessorFn: (row) => row.project?.name,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Project" />
      ),
      cell: ({ row }) => {
        const projectName = row.getValue('project') as string;
        return (
          <span className="text-sm truncate max-w-[120px]">
            {projectName || 'Unassigned'}
          </span>
        );
      },
      meta: {
        label: 'Project',
        placeholder: 'Search project...',
        variant: 'text' as const,
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterFn: (row, id, value) => {
        const rowValue = row.getValue(id) as string;
        return rowValue
          ? rowValue.toLowerCase().includes(String(value).toLowerCase())
          : false;
      },
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const config = statusConfig[status];
        return (
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${config?.dotColor || 'bg-muted'}`}
            />
            <span className="text-sm">{config?.label || status}</span>
          </div>
        );
      },
      meta: {
        label: 'Status',
        variant: 'select' as const,
        icon: CircleDot,
        options: Object.entries(statusConfig).map(([value, { label }]) => ({
          label,
          value,
        })),
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterFn: (row, id, value) => {
        if (!Array.isArray(value)) return false;
        if (value.length === 0) return true;
        return value.includes(row.getValue(id));
      },
    },
    {
      id: 'priority',
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Priority" />
      ),
      cell: ({ row }) => {
        const priority = row.getValue('priority') as string;
        const config = priorityConfig[priority];
        return (
          <Badge variant={config?.variant || 'outline'} className="text-xs">
            {config?.label || priority}
          </Badge>
        );
      },
      meta: {
        label: 'Priority',
        variant: 'select' as const,
        icon: AlertTriangle,
        options: Object.entries(priorityConfig).map(([value, { label }]) => ({
          label,
          value,
        })),
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterFn: (row, id, value) => {
        if (!Array.isArray(value)) return false;
        if (value.length === 0) return true;
        return value.includes(row.getValue(id));
      },
    },
    {
      id: 'assignee',
      accessorKey: 'assignedToId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Assignee" />
      ),
      cell: ({ row }) => {
        const task = row.original;
        return (
          <div className="flex items-center space-x-2">
            {task.assignee ? (
              <Avatar className="w-6 h-6">
                <AvatarImage src={task.assignee.avatarUrl || ''} />
                <AvatarFallback>{task.assignee.name?.[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px]">
                ?
              </div>
            )}
            <span className="text-sm truncate max-w-[120px]">
              {task.assignee?.name || 'Unassigned'}
            </span>
          </div>
        );
      },
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      id: 'dueDate',
      accessorKey: 'dueDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Due Date" />
      ),
      cell: ({ row }) => {
        const dueDate = row.getValue('dueDate') as Date | null;
        return (
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm">
              {dueDate ? new Date(dueDate).toLocaleDateString() : 'No date'}
            </span>
          </div>
        );
      },
      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      id: 'activity',
      accessorFn: (row) => row.comments?.length ?? 0,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Activity" />
      ),
      cell: ({ row }) => {
        const task = row.original;
        return (
          <div className="flex items-center justify-end space-x-3 text-xs text-muted-foreground">
            {task.comments && task.comments.length > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                {task.comments.length}
              </span>
            )}
          </div>
        );
      },
      enableColumnFilter: false,
      enableSorting: true,
      enableHiding: true,
    },
  ];
}

// ── Component ──

interface TableComponentProps {
  filteredTasks: Task[];
  pageCount: number;
  setSelectedTask: (task: Task) => void;
}

export default function TableComponent({
  filteredTasks,
  pageCount,
  setSelectedTask,
}: TableComponentProps) {
  const columns = React.useMemo(
    () => getColumns(setSelectedTask),
    [setSelectedTask],
  );

  const { table } = useDataTable({
    data: filteredTasks,
    columns,
    // Pass the total number of pages for the table
    pageCount,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      pagination: { pageIndex: 0, pageSize: 10 },
    },
    shallow: false,
    // Unique identifier for rows, can be used for unique row selection
    getRowId: (row) => row.id,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
