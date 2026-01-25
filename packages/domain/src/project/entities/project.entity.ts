export enum ProjectStatus {
  ACTIVE = 'active',
  PLANNING = 'planning',
  REVIEW = 'review',
  COMPLETED = 'completed',
}

export class Project {
  constructor(
    public readonly id: string,
    public readonly orgId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly slug: string,
    public readonly status: ProjectStatus,
    public readonly progress: number,
    public readonly totalTasks: number,
    public readonly completedTasks: number,
    public readonly dueDate: Date,
    public readonly members: string[], // User IDs or Avatars? Let's say User IDs for now, or strings for avatars as per mock
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
