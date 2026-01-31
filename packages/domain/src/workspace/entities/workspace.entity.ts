export class Workspace {
  constructor(
    public readonly id: string,
    public readonly orgId: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
