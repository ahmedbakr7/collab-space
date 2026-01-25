import {
  Organization,
  Visibility,
} from '@repo/domain/src/organization/entities/organization.entity';
import {
  Project,
  ProjectStatus,
} from '@repo/domain/src/project/entities/project.entity';
import {
  Task,
  TaskPriority,
  TaskStatus,
} from '@repo/domain/src/task/entities/task.entity';

export const MOCK_WORKSPACES: Organization[] = [
  {
    id: '1',
    name: 'Product Team',
    slug: 'product-team',
    description: 'Product management and design workspace',
    visibility: Visibility.PRIVATE,
    members: ['u1', 'u2', 'u3', 'u5', 'u7'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Engineering',
    slug: 'engineering',
    description: 'Software development and infrastructure',
    visibility: Visibility.PUBLIC,
    members: ['u2', 'u4', 'u6', 'u8'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Marketing',
    slug: 'marketing',
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
    orgId: '1', // Product Team
    name: 'Product Roadmap Q4',
    description: 'Q4 2024 feature planning and development roadmap',
    slug: 'product-roadmap-q4',
    status: ProjectStatus.ACTIVE,
    progress: 68,
    totalTasks: 95,
    completedTasks: 65,
    dueDate: new Date('2024-12-31'),
    members: ['u1', 'u2', 'u3'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    orgId: '2', // Engineering
    name: 'Backend Migration',
    description: 'Migrating legacy services to microservices',
    slug: 'backend-migration',
    status: ProjectStatus.PLANNING,
    progress: 30,
    totalTasks: 50,
    completedTasks: 15,
    dueDate: new Date('2025-03-31'),
    members: ['u4', 'u5'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    orgId: '1', // Product Team also has Website Redesign? Or Marketing?
    // Original data: 'product-team' had 'website-redesign' task.
    // Let's put it in Marketing (3) or Product (1).
    // Let's put it in Product (1) as per task data "workspace: 'Product Team'".
    // Wait, Task 3 in InMemoryTaskRepository: workspace: 'product-team', project: 'website-redesign'.
    // So Project 3 is in Org 1.
    name: 'Website Redesign',
    description: 'New corporate website design',
    slug: 'website-redesign',
    status: ProjectStatus.REVIEW,
    progress: 90,
    totalTasks: 40,
    completedTasks: 36,
    dueDate: new Date('2024-11-15'),
    members: ['u6', 'u7'],
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
    assignee: {
      name: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    },
    dueDate: new Date('2024-10-30'),
    comments: 3,
    attachments: 2,
    tags: ['Design', 'Marketing'],
    workspace: 'Product Team', // Name used in UI
    projectId: '3', // Website Redesign
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
    projectId: '2', // Backend Migration? Or Authentication System?
    // Data says 'Authentication System'. I need a project for that.
    // Let's assume Project 4 exists or link to 2.
    // I'll create Project 4 'Authentication System' in Engineering (2).
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
    workspace: 'Product Team',
    projectId: '3', // Website Redesign
    project: 'Website Redesign',
    createdBy: 'system',
    assignedTo: 'u3',
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Adding Project 4 for Auth System
];

// Add Project 4
MOCK_PROJECTS.push({
  id: '4',
  orgId: '2', // Engineering
  name: 'Authentication System',
  description: 'Auth system overhaul',
  slug: 'authentication-system',
  status: ProjectStatus.ACTIVE,
  progress: 50,
  totalTasks: 20,
  completedTasks: 10,
  dueDate: new Date('2024-12-01'),
  members: ['u2', 'u4'],
  createdAt: new Date(),
  updatedAt: new Date(),
});
