import {
  Organization,
  Visibility,
} from '@repo/domain/src/organization/entities/organization.entity';
import { Project } from '@repo/domain/src/project/entities/project.entity';
import {
  Task,
  TaskPriority,
  TaskStatus,
} from '@repo/domain/src/task/entities/task.entity';

export const MOCK_WORKSPACES: Organization[] = [
  {
    id: '1',
    name: 'Product Team',
    description: 'Product management and design workspace',
    visibility: Visibility.PRIVATE,
    members: ['u1', 'u2', 'u3', 'u5', 'u7'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Engineering',
    description: 'Software development and infrastructure',
    visibility: Visibility.PUBLIC,
    members: ['u2', 'u4', 'u6', 'u8'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Marketing',
    description: 'Marketing campaigns and content',
    visibility: Visibility.PUBLIC,
    members: ['u1', 'u3', 'u5'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    workspaceId: '1', // Product Team
    name: 'Product Roadmap Q4',
    description: 'Q4 2024 feature planning and development roadmap',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    workspaceId: '2', // Engineering
    name: 'Backend Migration',
    description: 'Migrating legacy services to microservices',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    workspaceId: '1', // Product Team
    name: 'Website Redesign',
    description: 'New corporate website design',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const MOCK_TASKS: Task[] = [
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
    tags: [],
    comments: [],
    attachments: [],
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
    tags: [],
    comments: [],
    attachments: [],
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
    tags: [],
    comments: [],
    attachments: [],
  },
  // Adding Project 4 for Auth System
];

// Add Project 4
MOCK_PROJECTS.push({
  id: '4',
  workspaceId: '2', // Engineering
  name: 'Authentication System',
  description: 'Auth system overhaul',
  status: 'active',
  createdAt: new Date(),
  updatedAt: new Date(),
});
