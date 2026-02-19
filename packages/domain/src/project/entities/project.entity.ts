export type ProjectStatus = 'active' | 'planning' | 'review' | 'completed';

export class Project {
  constructor(
    public readonly id: string,
    public readonly workspaceId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly status: ProjectStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
