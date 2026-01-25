import { useState, useEffect } from 'react';
import { GetAllTasksUseCase } from '../../application/use-cases/get-all-tasks.usecase';
import { InMemoryTaskRepository } from '../../infrastructure/repositories/in-memory-task.repository';
import { Task } from '@repo/domain/src/task/entities/task.entity';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const repository = new InMemoryTaskRepository();
    const useCase = new GetAllTasksUseCase(repository);

    async function fetchTasks() {
      try {
        const data = await useCase.execute();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  return { tasks, loading };
}
