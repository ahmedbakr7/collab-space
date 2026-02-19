import { TYPES } from '@/shared/layers/di/types';
import { Task, TaskStatus } from '@repo/domain/src/task/entities/task.entity';
import 'reflect-metadata';
import { useUseCase } from '@/shared/hooks/use-use-case';
import { TaskFilter } from '@/features/task/application/ports/task.repository.port';

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export function useProjectTasks(projectId: string) {
  const { data, loading } = useUseCase<TaskFilter | undefined, Task[]>(
    TYPES.IGetTasksUseCase,
    {
      initialInput: { projectId },
      skip: !projectId,
    },
  );

  const tasks = data || [];

  const columns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-muted-foreground',
      tasks: tasks.filter((t) => t.status === TaskStatus.TODO),
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-chart-1',
      tasks: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS),
    },
    {
      id: 'review',
      title: 'Review',
      color: 'bg-chart-4',
      tasks: tasks.filter((t) => t.status === TaskStatus.REVIEW),
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-chart-2',
      tasks: tasks.filter((t) => t.status === TaskStatus.DONE),
    },
  ];

  return { tasks, columns, loading };
}
