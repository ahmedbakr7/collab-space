export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress', // Fixed to match frontend hyphenated
  REVIEW = 'review',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export class Task {
  constructor(
    public readonly id: string,
    public readonly projectId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly status: TaskStatus,
    public readonly priority: TaskPriority,
    public readonly dueDate: Date,
    public readonly createdBy: string,
    public readonly assignedTo: string | null,
    public readonly assignee: { name: string; avatar: string }, // Frontend hydration
    public readonly comments: number,
    public readonly attachments: number,
    public readonly tags: string[],
    public readonly workspace: string, // Name or ID? Frontend has name 'Engineering'
    public readonly project: string, // Name or ID?
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
