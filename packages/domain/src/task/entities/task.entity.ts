export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
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
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
