export class TaskComment {
  constructor(
    public readonly id: string,
    public readonly taskId: string,
    public readonly userId: string,
    public readonly content: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
