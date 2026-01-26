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
    const tasks = [
      {
        id: '1',
        title: 'Design new landing page',
        description:
          'Create mockups for the new product landing page with updated branding',
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        assignee: {
          name: 'Emma Wilson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        },
        dueDate: new Date('2024-10-30'),
        comments: 3,
        attachments: 2,
        tags: ['Design', 'Marketing'],
        workspace: 'Product Team',
        projectId: 'project-1',
        project: 'Website Redesign',
        createdBy: 'system',
        assignedTo: 'u1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Update API documentation',
        description: 'Add documentation for the new authentication endpoints',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        assignee: {
          name: 'Michael Chen',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        },
        dueDate: new Date('2024-11-02'),
        comments: 1,
        attachments: 0,
        tags: ['Documentation'],
        workspace: 'Engineering',
        projectId: 'project-1',
        project: 'Authentication System',
        createdBy: 'system',
        assignedTo: 'u2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        title: 'Research competitor features',
        description: '',
        status: TaskStatus.TODO,
        assignee: {
          name: 'Lisa Rodriguez',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
        },
        priority: TaskPriority.LOW,
        dueDate: new Date('2024-11-05'),
        comments: 0,
        attachments: 1,
        workspace: 'product-team',
        projectId: 'project-1',
        project: 'website-redesign',
        createdBy: 'system',
        assignedTo: 'u3',
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        title: 'Implement user authentication',
        description: 'Add OAuth 2.0 support and JWT token handling',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.URGENT,
        assignee: {
          name: 'David Kim',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        },
        dueDate: new Date('2024-10-28'),
        comments: 8,
        attachments: 3,
        tags: ['Backend', 'Security'],
        workspace: 'Engineering',
        projectId: 'project-1',
        project: 'Authentication System',
        createdBy: 'system',
        assignedTo: 'u4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5',
        title: 'Mobile app testing',
        description: 'Test new features on iOS and Android devices',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        assignee: {
          name: 'Sarah Anderson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
        dueDate: new Date('2024-10-29'),
        comments: 5,
        attachments: 1,
        tags: ['QA', 'Mobile'],
        workspace: 'Product Team',
        projectId: 'project-1',
        project: 'Mobile App Q4',
        createdBy: 'system',
        assignedTo: 'u5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6',
        title: 'Code review for payment flow',
        description: '',
        status: TaskStatus.REVIEW,
        priority: TaskPriority.HIGH,
        assignee: {
          name: 'Alex Turner',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        },
        dueDate: new Date('2024-10-27'),
        comments: 12,
        attachments: 0,
        tags: ['Backend', 'Payments'],
        workspace: 'Engineering',
        projectId: 'project-1',
        project: 'Payments',
        createdBy: 'system',
        assignedTo: 'u6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7',
        title: 'Update user profile UI',
        description: 'Redesigned profile page with new layout and features',
        status: TaskStatus.DONE,
        priority: TaskPriority.MEDIUM,
        assignee: {
          name: 'Sophie Martinez',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
        },
        dueDate: new Date('2024-10-25'),
        comments: 6,
        attachments: 4,
        tags: ['Frontend', 'UI'],
        workspace: 'Product Team',
        projectId: 'project-1',
        project: 'User Profile',
        createdBy: 'system',
        assignedTo: 'u7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '8',
        title: 'Database migration',
        description: '',
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
        assignee: {
          name: 'Chris Lee',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris',
        },
        dueDate: new Date('2024-10-24'),
        comments: 2,
        attachments: 1,
        tags: ['Backend', 'Database'],
        workspace: 'Engineering',
        projectId: 'project-1',
        project: 'Database',
        createdBy: 'system',
        assignedTo: 'u8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    if (!filter) return tasks;

    return tasks.filter((task) => {
      if (filter.projectId && task.projectId !== filter.projectId) return false;
      if (filter.workspaceId && task.workspace !== filter.workspaceId)
        return false; // Note: workspace is name in mock?
      // filter.workspaceId might be slug or id. Mock has 'Engineering', 'Product Team'.
      // For now simple equality or partial?
      // Mock data uses names. Let's assume filter passes name for now or exact match.
      return true;
    });
  }
}
