import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { TaskRepositoryPort } from '../../application/ports/task.repository.port';
import {
  Task,
  TaskStatus,
  TaskPriority,
} from '@repo/domain/src/task/entities/task.entity';

@injectable()
export class InMemoryTaskRepository implements TaskRepositoryPort {
  async getTasks(filter?: {
    projectId?: string;
    workspaceId?: string;
    assigneeId?: string;
  }): Promise<Task[]> {
    const tasks: any[] = [
      {
        id: '1',
        title: 'Design new landing page',
        description:
          'Create mockups for the new product landing page with updated branding',
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2024-10-30'),
        projectId: '3', // Website Redesign
        createdById: 'system',
        assignedToId: 'u1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Update API documentation',
        description: 'Add documentation for the new authentication endpoints',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date('2024-11-02'),
        projectId: '2', // Backend Migration
        createdById: 'system',
        assignedToId: 'u2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        title: 'Research competitor features',
        description: '',
        status: TaskStatus.TODO,
        priority: TaskPriority.LOW,
        dueDate: new Date('2024-11-05'),
        projectId: '3', // Website Redesign
        createdById: 'system',
        assignedToId: 'u3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        title: 'Implement user authentication',
        description: 'Add OAuth 2.0 support and JWT token handling',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2024-10-28'),
        projectId: '2',
        createdById: 'system',
        assignedToId: 'u4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5',
        title: 'Mobile app testing',
        description: 'Test new features on iOS and Android devices',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2024-10-29'),
        projectId: '1',
        createdById: 'system',
        assignedToId: 'u5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6',
        title: 'Code review for payment flow',
        description: '',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2024-10-27'),
        projectId: '2',
        createdById: 'system',
        assignedToId: 'u6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7',
        title: 'Update user profile UI',
        description: 'Redesigned profile page with new layout and features',
        status: TaskStatus.DONE,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date('2024-10-25'),
        projectId: '3',
        createdById: 'system',
        assignedToId: 'u7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '8',
        title: 'Database migration',
        description: '',
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2024-10-24'),
        projectId: '2',
        createdById: 'system',
        assignedToId: 'u8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    if (!filter) return tasks;

    return tasks.filter((task) => {
      if (filter.projectId && task.projectId !== filter.projectId) return false;
      if (filter.workspaceId && task.workspace !== filter.workspaceId)
        return false;

      return true;
    });
  }
}
