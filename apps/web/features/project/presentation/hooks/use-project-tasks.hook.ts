import { useState, useEffect, useMemo } from 'react';
import { clientContainer } from '@/shared/layers/di/client.container';
import { TYPES } from '@/shared/layers/di/types';
import { GetTasksUseCase } from '@/features/task/application/use-cases/get-tasks.usecase';
import { Task, TaskStatus } from '@repo/domain/src/task/entities/task.entity';

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export function useProjectTasks(projectId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Resolve Use Case from DI Container
  const useCase = useMemo(
    () => clientContainer.resolve<GetTasksUseCase>(TYPES.IGetTasksUseCase),
    [],
  );

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await useCase.execute({ projectId });
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch project tasks', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [projectId, useCase]);

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
